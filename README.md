# Docs Cmd+Return to Comment (Safari)

Posts a Google Docs comment/reply when you press Cmd+Return inside the comment box.

## Install (requires Xcode)

1. Install Xcode from the App Store and open it once to accept the license.
2. In Terminal, from the folder containing this directory:

       xcrun safari-web-extension-converter docs-cmd-enter --app-name "Docs CmdReturn" --no-open

   (Drop `--no-open` if you want Xcode to open the project automatically.)
3. Open the generated project in Xcode, pick the macOS scheme, and press Run (Cmd+R).
4. In Safari: Settings > Extensions, enable "Docs CmdReturn".
   If it doesn't appear, enable Safari > Develop > "Allow Unsigned Extensions"
   (Develop menu: Settings > Advanced > "Show features for web developers"). This setting resets when Safari quits.
5. When Safari asks about website access, allow it for docs.google.com.

## Notes
- Unsigned extensions need step 4's toggle after each Safari restart. A free Apple ID lets you sign it locally in Xcode (Signing & Capabilities) so it persists.
- If Google changes its comment markup, edit the selectors in content.js.
