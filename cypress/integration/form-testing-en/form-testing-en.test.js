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

describe("Testing Bart.sk contact form in english", () => {
  beforeEach(() => {
    cy.visit("https://www.bart.sk/en/interested-in-test");
    cy.get("#c-p-bn").click();
  });

  it("Go to 'I'm interested' bart.sk page", () => {
    cy.visit("https://www.bart.sk/en/interested-in-test");
    cy.get("#contact-form").should("exist");
    const inputLabelNames = [
      "Name",
      "Company",
      "E-mail",
      "Phone",
      "Short description of your project",
    ];
    const inputIDs = ["name", "company-name", "email", "tel", "message"];
    shouldHaveClickableLabels(inputLabelNames, inputIDs);
    shouldHaveValidInputs();

    const header = "I'm interested in...";
    const interests = [
      "Design",
      "Software engineering",
      "Online marketing",
      "Web and mobile application",
      "E-shop",
      "Website",
      "Content management system",
    ];
    shouldHaveInterestInLabels(header, interests);
    shouldHighlightInputOnClick();
    shouldHighlightInputAfterLabelClick();
    shouldCheckAndUncheckInputs();

    const text =
      "By submitting, you consent to the processing of your personal data.";
    const link = "/files/ochrana_osobnych_udajov_en_US.pdf";
    shouldHavePersonalInfoLink(text, link);
  });

  it("Fill form", () => {
    shouldFillForm();
  });

  it("Send form", () => {
    submitBtnShouldHaveLoaderClass();
  });

  it("After sent form", () => {
    const mainHeader = "Thank you for your request.";
    const subHeader =
      "Your request has been successfully submitted. Within the next two business days I will contact you.";
    shouldShowSuccessNotification(mainHeader, subHeader);
  });

  it("Send form with required inputs not filled", () => {
    shouldShowNotificationToFillData();
  });

  it("Click on highlighted input with error message", () => {
    shouldRemoveBorderUponFocus("https://www.bart.sk/en/interested-in-test");
  });

  it("Click on 'personal data' link", () => {
    const link = "/files/ochrana_osobnych_udajov_en_US.pdf";
    shouldRedirectToPersonalData(link);
  });
});
