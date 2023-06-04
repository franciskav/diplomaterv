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
      },
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
  },
})
