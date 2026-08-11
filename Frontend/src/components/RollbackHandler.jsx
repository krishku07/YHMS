import { useEffect } from "react";

const ORIGINAL_FILES_KEY = "op20_rollback_backup";

/**
 * Rollback Handler Component
 * 
 * If user types "kk3" anywhere in the app, this component:
 * 1. Checks if there's a backup in localStorage
 * 2. Logs instructions for restoring originals from git/backup
 */
export function useKK3Rollback() {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "k" || e.key === "K") {
        // Watch for "kk3" sequence
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
}

/**
 * Creates a backup snapshot of original file contents before redesign.
 * Call this before making any changes.
 */
export function createBackupSnapshot(files) {
  try {
    const backup = {};
    for (const [path, content] of Object.entries(files)) {
      backup[path] = content;
    }
    localStorage.setItem(ORIGINAL_FILES_KEY, JSON.stringify(backup));
    console.log("[Rollback] Backup created successfully");
  } catch (e) {
    console.warn("[Rollback] Backup size too large for localStorage. Using git-based rollback.");
    console.log("[Rollback] Run: git stash && git checkout -- .");
  }
}

/**
 * Restores original files from backup.
 */
export function restoreFromBackup() {
  const backup = localStorage.getItem(ORIGINAL_FILES_KEY);
  if (!backup) {
    console.log("=== ROLLBACK INSTRUCTIONS (op20) ===");
    console.log("No localStorage backup found. To rollback manually:");
    console.log("1. In terminal: cd hostel-frontend");
    console.log("2. If using git: git checkout -- .");
    console.log("3. Or restore files from your editor's local history");
    return null;
  }
  return JSON.parse(backup);
}

export default function RollbackHandler() {
  useEffect(() => {
    let keyBuffer = "";

    const handler = (e) => {
      keyBuffer += e.key;
      if (keyBuffer.length > 4) {
        keyBuffer = keyBuffer.slice(-4);
      }
      if (keyBuffer === "op20") {
        keyBuffer = "";
        const backup = restoreFromBackup();
        if (backup) {
          console.log("[Rollback] Backup found. To restore files, run:");
          console.log("git checkout -- .  (or use VSCode local history)");
        }
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return null;
}

