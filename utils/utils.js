export const shouldHaveClickableLabels = (inputLabelNames, inputIDs) => {
  inputIDs.forEach(($id) => {
    cy.get(`#${$id}`)
      .prev()
      .then(($el) => {
        expect($el).to.have.attr("for", $id);
        expect($el).to.have.text(
          inputLabelNames.filter(($label) => {
            return $label === $el.text();
          })[0]
        );
      });
  });
};

export const shouldHaveValidInputs = () => {
  const inputNames = ["name", "company", "email", "tel", "message"];

  cy.get("#contact-form").within(() => {
    inputNames.forEach(($el) => {
      cy.get(`#form-group-${$el}`).should("exist").click();
    });
  });
};

export const shouldFillForm = () => {
  const data = {
    company: "My company",
    email: "novy@email.com",
    message: "my message",
    name: "Peter",
    tel: "0911918547",
  };

  cy.get("#name").type(data.name).should("have.value", "Peter");
  cy.get("#company-name").type(data.company).should("have.value", "My company");
  cy.get("#tel").type(data.tel).should("have.value", "0911918547");
  cy.get("#email").type(data.email).should("have.value", "novy@email.com");
  cy.get("#message").type(data.message).should("have.value", "my message");
};

export const shouldHighlightInputOnClick = () => {
  const inputNames = ["name", "company-name", "email", "tel", "message"];

  cy.get("#contact-form").within(() => {
    inputNames.forEach(($input) => {
      cy.get(`#${$input}`)
        .click()
        .then(($element) => {
          expect($element).to.have.css(
            "border-bottom",
            "2px solid rgb(255, 122, 49)"
          );
        });
    });
    cy.get("#message")
      .click()
      .then(($a) =>
        expect($a).to.have.css("border-bottom", "2px solid rgb(255, 122, 49)")
      );
  });
};

export const shouldHighlightInputAfterLabelClick = () => {
  cy.get("#contact-form label")
    .not("#form-group-interest > label")
    .each(($label) => {
      cy.get($label).click();
      cy.get($label)
        .next()
        .should("be.focused")
        .invoke("attr", "id")
        .should("eq", $label.attr("for"));
    });
};

export const shouldHaveInterestInLabels = (header, interests) => {
  cy.get("#form-group-interest > label:first-child").then(($el) => {
    cy.get($el).should("have.text", header);
  });
  cy.get("#form-group-interest > label")
    .not("#form-group-interest > label:first-child")
    .each(($label) => {
      cy.get($label).should(
        "contain.text",

        interests.filter(($interest) => {
          return $interest === $label.text().trim();
        })[0]
      );
    });
};

export const shouldCheckAndUncheckInputs = () => {
  cy.get("#form-group-interest > label")
    .not("label:first-child")
    .each(($label) => {
      cy.get($label).click();
      cy.get($label).children().should("be.checked");
      cy.get($label).children().click();
      cy.get($label).children().should("not.be.checked");
    });
};

export const shouldHavePersonalInfoLink = (text, link) => {
  cy.contains(text).should("exist");
  cy.get("#contact-form small > a")
    .should("exist")
    .and(($a) => {
      expect($a.attr("href")).to.equal(link);
    })
    .and("have.css", "color", "rgb(255, 122, 49)");
};

export const shouldRedirectToPersonalData = (link) => {
  cy.get("#contact-form small > a")
    .should(($a) => {
      expect($a.attr("target"), "target").to.equal("_blank");
      $a.attr("target", "_self");
    })
    .click();
  cy.location("pathname").should("equal", link);
};

export const submitBtnShouldHaveLoaderClass = () => {
  cy.get("#contact-submit")
    .click()
    .then(($button) => {
      expect($button)
        .to.have.class("loader-container")
        .and.to.have.css("content", '""');
      expect($button).to.have.css("transition", "max-width 1s ease 0s");
    });
};

export const shouldShowNotificationToFillData = () => {
  const inputIDs = ["name", "company-name", "email", "tel", "message"];

  cy.get("#name").type("Peter Babej");
  cy.get("#message").type("My message");
  cy.get("#contact-submit")
    .click()
    .then(() => {
      inputIDs.forEach(($input) => {
        cy.get(`#${$input}`).then(($el) => {
          if ($el.val() === "") {
            cy.get($el)
              .should("be.empty")
              .should("have.css", "border-bottom", "2px solid rgb(255, 0, 0)");
            cy.get($el)
              .next("span")
              .should("exist")
              .and("have.css", "color", "rgb(255, 0, 0)");
          } else {
            cy.get($el).should(
              "have.css",
              "border-bottom",
              "2px solid rgb(249, 249, 249)"
            );
          }
        });
      });
    });
};

export const shouldRemoveBorderUponFocus = (link) => {
  const inputIDs = ["name", "company-name", "email", "tel", "message"];

  cy.get("#contact-submit")
    .click()
    .then(() => {
      cy.request("POST", link, {}).then(() => {
        cy.wait(3000);
        inputIDs.forEach(($input) => {
          cy.get(`#${$input}`)
            .click()
            .then(($el) => {
              cy.focused();
              cy.wait(1000);
              expect($el).to.have.css(
                "border-bottom",
                "2px solid rgb(255, 122, 49)"
              );
              cy.get($el).children("span").should("not.exist");
            });
        });
      });
    });
};

export const shouldShowSuccessNotification = (main, subHeader) => {
  const data = {
    company: "My company",
    email: "novy@email.com",
    meet: "23424233",
    message: "my message",
    name: "Peter",
    tel: "0911918547",
  };
  const input = document.createElement("input");
  input.setAttribute("name", "meet");
  input.setAttribute("id", "meet");
  cy.get("#contact-form").then(($el) => {
    $el.get(0).appendChild(input);
  });
  cy.get("#name").type(data.name);
  cy.get("#meet").type(data.meet);
  cy.get("#company-name").type(data.company);
  cy.get("#tel").type(data.tel);
  cy.get("#email").type(data.email);
  cy.get("#message").type(data.message);
  cy.get("#contact-submit")
    .click()
    .then(() => {
      cy.wait(4000);
      cy.get("#modal-overlay-contact-us")
        .should("be.visible")
        .should("contain", main)
        .should("contain", subHeader);
    });
};
