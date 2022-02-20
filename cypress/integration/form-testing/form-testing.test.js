/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("https://www.bart.sk/mam-zaujem-test");
  cy.get("#c-p-bn").click();
});

describe("Testing Bart.sk contact form", () => {
  it("Should have valid clickable labels", () => {
    const inputLabelNames = [
      "Vaše meno",
      "Názov spoločnosti",
      "E-mail",
      "Telefón",
      "Krátky popis Vášho projektu",
    ];
    const labelForAttrs = ["name", "company-name", "email", "tel", "message"];

    cy.get(".form-group > label").each(($el) => {
      if (!$el.first().attr("for")) {
        expect($el).to.have.text("Mám záujem o...");
      } else {
        expect($el).to.have.attr(
          "for",
          labelForAttrs.filter(($name) => {
            return $name === $el.attr("for");
          })[0]
        );
        expect($el).to.have.text(
          inputLabelNames.filter(($name) => {
            return $name === $el.text();
          })[0]
        );
      }
    });
  });

  it("Should have all valid form inputs with correct name properties", () => {
    const inputNames = ["name", "company", "email", "tel", "message"];

    cy.get("form").within(() => {
      cy.get(".form-group input")
        .not("input[type=checkbox]")
        .each(($el) => {
          expect($el)
            .to.have.attr("name")
            .equal(
              inputNames.filter(($name) => {
                return $name === $el.attr("name");
              })[0]
            );
        });
    });
  });

  it("Should  highlight when clicked on input", () => {
    cy.get("form").within(() => {
      cy.get("input")
        .not("input[type=checkbox]")
        .each(($el) => {
          cy.get($el)
            .click()
            .then(($element) => {
              expect($element).to.have.css(
                "border-bottom",
                "2px solid rgb(255, 122, 49)"
              );
            });
        });
      cy.get("textarea[id=message]")
        .click()
        .then(($a) =>
          expect($a).to.have.css("border-bottom", "2px solid rgb(255, 122, 49)")
        );
    });
  });

  it("Should highlight correct input when clicking on its label", () => {
    cy.get("form label")
      .not("#form-group-interest > label")
      .each(($l) => {
        cy.get($l).click();
        cy.get($l)
          .next()
          .should("be.focused")
          .invoke("attr", "id")
          .should("eq", $l.attr("for"));
      });
  });

  it("Should check and uncheck checkbox inputs when clicking on their labels or itself", () => {
    cy.get("#form-group-interest > label")
      .not("label:first-child")
      .each(($label) => {
        cy.get($label).click();
        cy.get($label).children().should("be.checked");
        cy.get($label).children().click();
        cy.get($label).children().should("not.be.checked");
      });
  });

  it("Should have 'ochrana osobných údajov' link", () => {
    cy.contains("Odoslaním súhlasite so spracovaním osobných údajov.").should(
      "exist"
    );
    cy.get("small > a")
      .should("exist")
      .and(($a) => {
        expect($a.attr("href")).to.equal(
          "/files/ochrana_osobnych_udajov_sk_SK.pdf"
        );
      })
      .and("have.css", "color", "rgb(255, 122, 49)");
  });

  it("Should redirect me to 'ochrana osobných údajov' document", () => {
    cy.get("small > a")
      .should(($a) => {
        expect($a.attr("target"), "target").to.equal("_blank");
        $a.attr("target", "_self");
      })
      .click();
    cy.location("pathname").should(
      "equal",
      "/files/ochrana_osobnych_udajov_sk_SK.pdf"
    );
  });

  it("Send button should have loader-container class active", () => {
    cy.get("#contact-submit")
      .click()
      .then(($button) => {
        expect($button)
          .to.have.class("loader-container")
          .and.to.have.css("content", '""');
        expect($button).to.have.css("transition", "max-width 1s ease 0s");
      });
  });

  it("Should show notification to fill data if not filled", () => {
    cy.get("#name").type("Peter Babej");
    cy.get("#message").type("My message");
    cy.get("#contact-submit")
      .click()
      .then(() => {
        cy.get(".form-group").each(($el) => {
          if ($el.children("input, textarea").val() === "") {
            cy.get($el)
              .children("input,textarea")
              .should("be.empty")
              .should("have.css", "border-bottom", "2px solid rgb(255, 0, 0)");
            cy.get($el)
              .children(".error-text")
              .should("exist")
              .and("have.css", "color", "rgb(255, 0, 0)");
          } else {
            cy.get($el).should(
              "have.css",
              "border-bottom",
              "0px none rgb(0, 0, 0)"
            );
          }
        });
      });
  });

  it("Should remove notification and red border from input when focused", () => {
    cy.get("#contact-submit")
      .click()
      .then(($button) => {
        cy.request("POST", "https://www.bart.sk/mam-zaujem-test", {}).then(
          () => {
            cy.get(".form-group")
              .children("input,textarea")
              .each(($el) => {
                cy.get($el)
                  .click()
                  .then(($el) => {
                    cy.wait(1000);
                    cy.focused().then(console.log);
                    expect($el).to.have.css(
                      "border-bottom",
                      "2px solid rgb(255, 122, 49)"
                    );
                    cy.get($el).children("span").should("not.exist");
                  });
              });
          }
        );
      });
  });

  it("Should show modal window after successful request", () => {
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
    cy.get(".form-group:first-child").then(($el) => {
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
        cy.wait(1500);
        cy.get(".modal-box")
          .should("be.visible")
          .should("contain", "Ďakujem za vyplnenie žiadosti")
          .should(
            "contain",
            "Vaša žiadosť bola úspešne odoslaná. V priebehu najbližších dvoch pracovných dní Vás budem kontaktovať."
          );
      });
  });
});
