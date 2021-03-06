/// <reference types="cypress" />
import {
  shouldCheckAndUncheckInputs,
  shouldFillForm,
  shouldHaveClickableLabels,
  shouldHaveInterestInLabels,
  shouldHavePersonalInfoLink,
  shouldHaveValidInputs,
  shouldHighlightInputAfterLabelClick,
  shouldHighlightInputOnClick,
  shouldRedirectToPersonalData,
  shouldRemoveBorderUponFocus,
  shouldShowNotificationToFillData,
  shouldShowSuccessNotification,
  submitBtnShouldHaveLoaderClass,
} from "../../../utils/utils";

describe("Testing Bart.sk contact form in slovak language", () => {
  beforeEach(() => {
    cy.visit("https://www.bart.sk/mam-zaujem-test");
    cy.get("#c-p-bn").click();
  });
  it("Go to 'Mám záujem' bart.sk page", () => {
    cy.visit("https://www.bart.sk/mam-zaujem-test");
    cy.get("#contact-form").should("exist");
    const inputLabelNames = [
      "Vaše meno",
      "Názov spoločnosti",
      "E-mail",
      "Telefón",
      "Krátky popis Vášho projektu",
    ];
    const inputIDs = ["name", "company-name", "email", "tel", "message"];
    shouldHaveClickableLabels(inputLabelNames, inputIDs);
    shouldHaveValidInputs();

    const header = "Mám záujem o...";
    const interests = [
      "Dizajn",
      "Programovanie",
      "Online marketing",
      "Webová a mobilná aplikácia",
      "Internetový obchod",
      "Web stránka",
      "Redakčný systém",
    ];
    shouldHaveInterestInLabels(header, interests);
    shouldHighlightInputOnClick();
    shouldHighlightInputAfterLabelClick();
    shouldCheckAndUncheckInputs();

    const text = "Odoslaním súhlasite so spracovaním osobných údajov.";
    const link = "/files/ochrana_osobnych_udajov_sk_SK.pdf";
    shouldHavePersonalInfoLink(text, link);
  });

  it("Fill form", () => {
    shouldFillForm();
  });

  it("Send form", () => {
    submitBtnShouldHaveLoaderClass();
  });

  it("After sent form", () => {
    const mainHeader = "Ďakujem za vyplnenie žiadosti";
    const subHeader =
      "Vaša žiadosť bola úspešne odoslaná. V priebehu najbližších dvoch pracovných dní Vás budem kontaktovať.";
    shouldShowSuccessNotification(mainHeader, subHeader);
  });

  it("Send form with required inputs not filled", () => {
    shouldShowNotificationToFillData();
  });

  it("Click on highlighted input with error message", () => {
    shouldRemoveBorderUponFocus("https://www.bart.sk/mam-zaujem-test");
  });

  it("Click on 'ochrana osobných údajov' link", () => {
    const link = "/files/ochrana_osobnych_udajov_sk_SK.pdf";
    shouldRedirectToPersonalData(link);
  });
});
