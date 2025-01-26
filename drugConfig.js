export const DRUG_CONFIG = {
  Doliprane: {
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
  Fervex: {
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
  Dafalgan: {
    baseDegrade: 2,
    expiredDegrade: 4,
    neverExpires: false,
    customUpdater: null,
  },
  _default: {
    baseDegrade: 1,
    expiredDegrade: 2,
    neverExpires: false,
    customUpdater: null,
  },
};
