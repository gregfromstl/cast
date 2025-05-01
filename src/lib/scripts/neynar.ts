/**
 * Taken from https://neynarxyz.github.io/siwn/raw/1.2.0/index.js 
 */

function handleMessage(event: any, authOrigin: any, successCallback: any, authWindow: WindowProxy | null) {
  if (event.origin === authOrigin && event.data.is_authenticated) {
    if (typeof window[successCallback] === "function") {
      (window[successCallback] as any)(event.data); // Call the global callback function
    }

    if (authWindow) {
      authWindow.close();
    }

    successCallback(event.data);

    window.removeEventListener("message", handleMessage as any);
  }
}

export function handleSignIn(
  clientId: string,
  successCallback: (data: any) => void,
  redirectUri?: string,
) {
  const authUrl = new URL("https://app.neynar.com/login");
  authUrl.searchParams.append("client_id", clientId);
  if (redirectUri) {
    authUrl.searchParams.append("redirect_uri", redirectUri);
  }

  const authOrigin = new URL("https://app.neynar.com/login").origin;

  var isDesktop = window.matchMedia("(min-width: 800px)").matches;

  var width = 600,
    height = 700;
  var left = window.screen.width / 2 - width / 2;
  var top = window.screen.height / 2 - height / 2;

  // Define window features for the popup
  var windowFeatures = `width=${width},height=${height},top=${top},left=${left}`;

  var windowOptions = isDesktop ? windowFeatures : "fullscreen=yes";

  const authWindow = window.open(authUrl.toString(), "_blank", windowOptions);
  window.addEventListener(
    "message",
    function(event) {
      handleMessage(event, authOrigin, successCallback, authWindow);
    },
    false
  );
}

