import { DRUG_CONFIG } from "./drugConfig";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  static clamp(drugBenefit) {
    return Math.max(0, Math.min(drugBenefit, 50));
  }

  static isExpired(drugExpiresIn) {
    return drugExpiresIn < 0;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      const config = DRUG_CONFIG[drug.name] || DRUG_CONFIG._default;

      if (config.neverExpires) {
        return;
      }

      drug.expiresIn -= 1;

      if (typeof config.customUpdater === "function") {
        config.customUpdater(drug);
        drug.benefit = Drug.clamp(drug.benefit);

        return;
      }

      if (!Drug.isExpired(drug.expiresIn)) {
        drug.benefit -= config.baseDegrade;
      } else {
        drug.benefit -= config.expiredDegrade;
      }

      drug.benefit = Drug.clamp(drug.benefit);
    });

    return this.drugs;
  }
}
