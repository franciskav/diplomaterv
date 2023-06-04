export class ValidationHelper {
  static isValidEmail = (email: string) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/
    return reg.test(email)
  }

  static isStrongPassword = (email: string) => {
    const reg = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})',
    )
    return reg.test(email)
  }
}
