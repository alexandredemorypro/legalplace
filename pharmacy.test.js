import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  describe("Doliprane", () => {
    it("should degrade benefit by 1 and expiresIn by 1 before expiry", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 5, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Doliprane", 4, 9));
    });

    it("should degrade benefit by 2 after expiry", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 0, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Doliprane", -1, 8));
    });

    it("should not set benefit below 0", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 1, 0)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Doliprane", 0, 0));
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 before expiry", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 5, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Herbal Tea", 4, 11));
    });

    it("should increase benefit by 2 after expiry", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Herbal Tea", -1, 12));
    });

    it("should not exceed benefit of 50", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 5, 50)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Herbal Tea", 4, 50));
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 if more than 10 days left", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 11, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 10, 11));
    });

    it("should increase benefit by 2 if 10 days or less", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 10, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 9, 12));
    });

    it("should increase benefit by 3 if 5 days or less", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 5, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 4, 13));
    });

    it("should never exceed benefit of 50 even with multiple increments", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 5, 49)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", 4, 50));
    });

    it("should drop benefit to 0 after expiry", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 0, 20)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Fervex", -1, 0));
    });
  });

  describe("Magic Pill", () => {
    it("should never change benefit or expiresIn", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", 5, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Magic Pill", 5, 10));
    });
  });

  describe("Dafalgan", () => {
    it("should degrade benefit twice as fast as normal (base degrade = 2)", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 5, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", 4, 8));
    });

    it("should degrade benefit by 4 after expiry", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 10)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", -1, 6));
    });

    it("should not go below 0", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 1, 1)]);
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", 0, 0));
      pharmacy.updateBenefitValue();
      expect(pharmacy.drugs[0]).toEqual(new Drug("Dafalgan", -1, 0));
    });
  });
});
