export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const DRUG_CONFIG = {
  "Doliprane": {
    baseDegrade: 1,
    expiredDegrade: 2,
    neverExpires: false,
    customUpdater: null,
  },
  "Herbal Tea": {
    baseDegrade: -1,
    expiredDegrade: -2,
    neverExpires: false,
    customUpdater: null,
  },
  "Fervex": {
    baseDegrade: 0,
    expiredDegrade: 0,
    neverExpires: false,
    customUpdater: (drug) => {
      if (drug.expiresIn <= 0) {
        drug.benefit = 0;

        return;
      }

      drug.benefit += 1;

      if (drug.expiresIn < 10) {
        drug.benefit += 1;
      }

      if (drug.expiresIn < 5) {
        drug.benefit += 1;
      }
    },
  },
  "Magic Pill": {
    baseDegrade: 0,
    expiredDegrade: 0,
    neverExpires: true,
    customUpdater: null,
  },
  "Dafalgan": {
    baseDegrade: 2,
    expiredDegrade: 4,
    neverExpires: false,
    customUpdater: null,
  },
  "_default": {
    baseDegrade: 1,
    expiredDegrade: 2,
    neverExpires: false,
    customUpdater: null,
  },
};

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
