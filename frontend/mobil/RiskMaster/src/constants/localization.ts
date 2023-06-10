import LocalizedStrings from 'react-native-localization'

export const strings = new LocalizedStrings({
  hu: {
    appName: 'RiskMaster',
    common: {
      errors: {
        empty: 'A mező kitöltése kötelező',
        invalidEmail: 'Hibás email cím',
        passwordsDontMatch: 'A két jelszó nem egyforma',
        attention: 'Figyelem!',
        authError: 'Azonosítási hiba, kérjük próbálja meg újra!',
        saveError:
          'Hiba történt az adatok mentése közben, kérjük próbálja meg újra!',
        loadError:
          'Hiba történt az adatok betöltése közben, kérjük próbálja meg újra!',
        unexpectedError: 'Váratlan hiba történt, kérjük próbálja meg újra!',
      },
      succes: {
        title: 'Sikeres művelet',
      },
      buttons: {
        save: 'Mentés',
        cancel: 'Mégse',
        ok: 'Ok',
      },
      sort: {
        title: 'Rendezés',
        nameIncreasing: 'Név szerint növekvő (A-Z)',
        nameDecreasing: 'Név szerint csökkenő (Z-A)',
        dateIncreasing: 'Dátum szerint növekvő',
        dateDecreasing: 'Dátum szerint csökkenő',
      },
      actions: {
        title: 'Műveletek',
        edit: 'Szerkesztés',
        delete: 'Törlés',
      },
      search: 'Keresés...',
    },
    tab: {
      companies: 'Cégek',
      notifications: 'Értesítések',
      profile: 'Profil',
    },
    login: {
      email: 'Email',
      emailPlaceholder: 'teszt@mail.com',
      password: 'Jelszó',
      passwordPlaceholder: 'Jelszó',
      login: 'Bejelentkezés',
      dontHaveProfile: 'Még nincs fiókod?',
      doSignUp: 'Regisztrálj!',
    },
    signUp: {
      title: 'Regisztráció',
      company: 'Cég',
      firsName: 'Keresztnév',
      lastName: 'Vezetéknév',
      email: 'Email',
      password: 'Jelszó',
      passwordAgain: 'Jelszó megerősítése',
      signUp: 'Regisztráció',
    },
    companies: {
      title: 'Cégek',
      emptyList: 'A megadott keresési feltételek mellet nem található cég',
      addItem: '+ Új hozzáadása',
      lastAssessment: 'Utolsó kockázatelenzés',
      listError: 'A cégek betöltése sikertelen',
    },
    createCompany: {
      createTitle: 'Cég létrehozása',
      editTitle: 'Cég módosítása',
      companyData: 'Cégadatok',
      contactData: 'Kapcsolattartó',
      companyName: 'Cégnév',
      zipCode: 'Irányítószám',
      city: 'Város',
      street: 'Utca, házszám',
      door: 'Emelet, ajtó',
      contactName: 'Név',
      email: 'Email',
      phone: 'Telefon',
    },
    companyDetails: {
      numberOfPositions: 'Munkakörök',
      riskLevels: 'Kockázati szintek',
      emptyList: 'A megadott keresési feltételek mellet nem található elemzés',
      addItem: '+ Új hozzáadása',
    },
    createAssessment: {
      createTitle: 'Új kockázatelemzés',
      editTitle: 'Kockázatelemezés szerkesztése',
      name: 'Név',
      date: 'Időpont',
      type: 'Helyszín típus',
    },

    physicalRisk: {
      risks: 'Kockázatok',
      photos: 'Fényképek',
      emptyList: 'Nem található kockázat',
      addItem: '+ Új hozzáadása',
      riskPoint: 'Kockázat pontszám: ',
      riskDegree: 'Kockázat mértéke: ',
      proposedAction: 'Javasolt intézkedések',
    },

    notifications: {
      title: 'Értesítések',
    },
    profile: {
      title: 'Profil',
      logout: 'Kijelentkezés',
    },
  },
})
