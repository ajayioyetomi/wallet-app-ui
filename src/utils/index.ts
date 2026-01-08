export function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

// auth.ts
export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem('token'));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // Normalize dates to midnight for comparison
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (date >= startOfToday) {
    return `Today ${time}`;
  }

  if (date >= startOfYesterday) {
    return `Yesterday ${time}`;
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  return `${formattedDate} ${time}`;
}

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} - ${formattedTime}`;
}



