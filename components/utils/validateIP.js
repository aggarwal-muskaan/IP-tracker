export const validateIP = (userEntered) => {
  const ipAddress = RegExp(
    "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
  );
  return ipAddress.test(userEntered);
};

export const validateDomain = (userEntered) => {
  const domainRegex = RegExp(
    "/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,}$/"
  );

  return domainRegex.test(userEntered);
};
