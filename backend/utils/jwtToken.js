// Create and send token and save in cookie
const sendToken = (user, statusCode, res) => {
  // Create JWT Token
  const accessToken = user.getJwtToken()
  const refreshToken = user.getJwtRefreshToken()

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }

  // if(process.env.NODE_ENV === 'production ') {
  //     options.secure = true;
  // }

  res
    .status(statusCode)
    .cookie('accessToken', accessToken, 'refreshToken', refreshToken, options)
    .json({
      success: true,
      accessToken,
      refreshToken,
    })
}

module.exports = sendToken
