import { DRUG_CONFIG } from "./drugConfig";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

function clamp(value) {
  return Math.max(0, Math.min(value, 50));
}

function isExpired(drug) {
  return drug.expiresIn < 0;
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
        drug.benefit = clamp(drug.benefit);

        return;
      }

      if (!isExpired(drug)) {
        drug.benefit -= config.baseDegrade;
      } else {
        drug.benefit -= config.expiredDegrade;
      }

      drug.benefit = clamp(drug.benefit);
    });

    return this.drugs;
  }
}
