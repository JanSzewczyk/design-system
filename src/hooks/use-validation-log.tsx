import * as React from "react";

interface UseValidationLogProps {
  check: boolean;
  scope: string;
  message: string;
}

export function useValidationLog({ check, scope, message }: UseValidationLogProps) {
  React.useEffect(() => {
    if (!check) {
      // biome-ignore lint/suspicious/noConsole: intentional dev-time validation warning
      console.error(
        `%c[Szum Tech-Design System]%c\n ${scope}%c\n ${message}`,
        "color: #ef4444; font-weight: bold;",
        "color: #3b82f6; font-weight: bold;",
        "color: #f59e0b;"
      );
    }
  }, [check, scope, message]);
}
