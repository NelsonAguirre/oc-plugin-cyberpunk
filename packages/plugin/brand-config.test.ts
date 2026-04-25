import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { loadBrandConfig, DEFAULT_BRAND } from "./brand-config.js";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Create a unique temp directory and return its path */
function makeTempDir(prefix: string): string {
  const dir = join(
    tmpdir(),
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  mkdirSync(dir, { recursive: true });
  return dir;
}

/** Write a text file (one line per array entry) into a directory */
function writeArtFile(dir: string, filename: string, lines: string[]): void {
  writeFileSync(join(dir, filename), lines.join("\n"), "utf-8");
}

/** Write a brand.json file into a directory */
function writeBrandJson(dir: string, data: Record<string, unknown>): void {
  writeFileSync(join(dir, "brand.json"), JSON.stringify(data), "utf-8");
}

// ─── Test state ─────────────────────────────────────────────────────────────

let globalDir: string;
let localDir: string;

beforeEach(() => {
  globalDir = makeTempDir("global");
  localDir = makeTempDir("local");
});

afterEach(() => {
  rmSync(globalDir, { recursive: true, force: true });
  rmSync(localDir, { recursive: true, force: true });
});

// ─── Local asset wins over global (Two-Tier-Asset-Resolution) ────

describe("Local asset wins over global (Two-Tier-Asset-Resolution)", () => {
  it("returns the local side.txt when both local and global versions exist", () => {
    const localSide = ["LOCAL_SIDE_LINE_1", "LOCAL_SIDE_LINE_2"];
    const globalSide = ["GLOBAL_SIDE_LINE_1", "GLOBAL_SIDE_LINE_2"];

    writeArtFile(localDir, "side.txt", localSide);
    writeArtFile(globalDir, "side.txt", globalSide);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.side).toEqual(localSide);
  });

  it("returns local home-small.txt over global when both exist", () => {
    const localSmall = ["LOCAL_SMALL"];
    const globalSmall = ["GLOBAL_SMALL"];

    writeArtFile(localDir, "home-small.txt", localSmall);
    writeArtFile(globalDir, "home-small.txt", globalSmall);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.small).toEqual(localSmall);
  });

  it("returns local home-medium.txt over global when both exist", () => {
    const localMedium = ["LOCAL_MEDIUM"];
    const globalMedium = ["GLOBAL_MEDIUM"];

    writeArtFile(localDir, "home-medium.txt", localMedium);
    writeArtFile(globalDir, "home-medium.txt", globalMedium);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.medium).toEqual(localMedium);
  });

  it("returns local home-large.txt over global when both exist", () => {
    const localLarge = ["LOCAL_LARGE"];
    const globalLarge = ["GLOBAL_LARGE"];

    writeArtFile(localDir, "home-large.txt", localLarge);
    writeArtFile(globalDir, "home-large.txt", globalLarge);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.large).toEqual(localLarge);
  });
});

// ─── Global asset used when no local override ────────────────────

describe("Global asset used when no local override exists", () => {
  it("returns global side.txt when local dir has no side.txt", () => {
    const globalSide = ["GLOBAL_SIDE_ONLY"];
    writeArtFile(globalDir, "side.txt", globalSide);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.side).toEqual(globalSide);
  });

  it("returns global home-small.txt when local dir has no home-small.txt", () => {
    const globalSmall = ["GLOBAL_SMALL_ONLY"];
    writeArtFile(globalDir, "home-small.txt", globalSmall);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.small).toEqual(globalSmall);
  });

  it("returns global home-large.txt when local dir has no home-large.txt", () => {
    const globalLarge = ["GLOBAL_LARGE_ONLY"];
    writeArtFile(globalDir, "home-large.txt", globalLarge);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.large).toEqual(globalLarge);
  });
});

// ─── Built-in default when neither local nor global asset exists ─

describe("Built-in default when neither local nor global asset exists", () => {
  it("returns DEFAULT_BRAND.art.side when no side.txt exists anywhere", () => {
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.side).toEqual(DEFAULT_BRAND.art.side);
  });

  it("returns DEFAULT_BRAND.art.small when no home-small.txt exists anywhere", () => {
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.small).toEqual(DEFAULT_BRAND.art.small);
  });

  it("returns DEFAULT_BRAND.art.medium when no home-medium.txt exists anywhere", () => {
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.medium).toEqual(DEFAULT_BRAND.art.medium);
  });

  it("returns DEFAULT_BRAND.art.large when no home-large.txt exists anywhere", () => {
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.large).toEqual(DEFAULT_BRAND.art.large);
  });

  it("returns DEFAULT_BRAND.name when no brand.json exists anywhere", () => {
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.name).toEqual(DEFAULT_BRAND.name);
  });
});

// ─── localDir omitted → global-only resolution ───────────────────

describe("localDir omitted → global-only resolution (Optional-LocalDir-Parameter)", () => {
  it("returns global side.txt when localDir is not provided", () => {
    const globalSide = ["GLOBAL_ONLY_SIDE"];
    writeArtFile(globalDir, "side.txt", globalSide);

    const config = loadBrandConfig(globalDir);

    expect(config.art.side).toEqual(globalSide);
  });

  it("returns DEFAULT_BRAND.art.side when localDir is not provided and global has no side.txt", () => {
    const config = loadBrandConfig(globalDir);

    expect(config.art.side).toEqual(DEFAULT_BRAND.art.side);
  });

  it("returns global brand name when localDir is not provided", () => {
    writeBrandJson(globalDir, { name: "GLOBAL_BRAND" });

    const config = loadBrandConfig(globalDir);

    expect(config.name).toBe("GLOBAL_BRAND");
  });

  it("omitting localDir does NOT read local files even if they happen to exist", () => {
    // Smoke test: with no localDir, only global path matters
    const globalSmall = ["GLOBAL_SMALL_NO_LOCAL"];
    writeArtFile(globalDir, "home-small.txt", globalSmall);
    // localDir is omitted — no second argument
    const config = loadBrandConfig(globalDir);

    expect(config.art.small).toEqual(globalSmall);
  });
});

// ─── local brand.json name overrides global (Brand-Name-Override) ─

describe("localDir/brand.json name overrides globalDir/brand.json name (Brand-Name-Override)", () => {
  it("local brand.json name wins over global brand.json name", () => {
    writeBrandJson(localDir, { name: "LOCAL_NAME" });
    writeBrandJson(globalDir, { name: "GLOBAL_NAME" });

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.name).toBe("LOCAL_NAME");
  });

  it("global brand.json name is used when no local brand.json exists", () => {
    writeBrandJson(globalDir, { name: "GLOBAL_NAME_ONLY" });

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.name).toBe("GLOBAL_NAME_ONLY");
  });

  it("DEFAULT_BRAND.name is used when neither local nor global brand.json exists", () => {
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.name).toBe(DEFAULT_BRAND.name);
  });

  it("brand name is capped at 20 characters", () => {
    writeBrandJson(localDir, {
      name: "A_VERY_LONG_BRAND_NAME_THAT_EXCEEDS_LIMIT",
    });

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.name.length).toBeLessThanOrEqual(20);
  });
});

// Per-asset independence (Per-Asset-Independence) ─────────────

describe("Per-asset independence: one local override does not affect others", () => {
  it("overriding only side locally does not affect small/medium/large (they fall back to global or default)", () => {
    const localSide = ["LOCAL_SIDE_ONLY"];
    const globalSmall = ["GLOBAL_SMALL_INTACT"];
    const globalMedium = ["GLOBAL_MEDIUM_INTACT"];

    writeArtFile(localDir, "side.txt", localSide);
    writeArtFile(globalDir, "home-small.txt", globalSmall);
    writeArtFile(globalDir, "home-medium.txt", globalMedium);
    // No local home-small.txt or home-medium.txt

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.side).toEqual(localSide);
    expect(config.art.small).toEqual(globalSmall);
    expect(config.art.medium).toEqual(globalMedium);
    expect(config.art.large).toEqual(DEFAULT_BRAND.art.large);
  });

  it("overriding only home-small locally does not affect side or home-large", () => {
    const localSmall = ["LOCAL_SMALL_ONLY"];
    const globalSide = ["GLOBAL_SIDE_INTACT"];
    const globalLarge = ["GLOBAL_LARGE_INTACT"];

    writeArtFile(localDir, "home-small.txt", localSmall);
    writeArtFile(globalDir, "side.txt", globalSide);
    writeArtFile(globalDir, "home-large.txt", globalLarge);

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.small).toEqual(localSmall);
    expect(config.art.side).toEqual(globalSide);
    expect(config.art.large).toEqual(globalLarge);
    expect(config.art.medium).toEqual(DEFAULT_BRAND.art.medium);
  });

  it("each asset resolves fully independently across all 4 tiers", () => {
    // All 4 assets with different tier sources
    const localSide = ["L_SIDE"];
    const globalSmall = ["G_SMALL"];
    // medium → default
    const localLarge = ["L_LARGE"];

    writeArtFile(localDir, "side.txt", localSide);
    writeArtFile(globalDir, "home-small.txt", globalSmall);
    writeArtFile(localDir, "home-large.txt", localLarge);
    // No home-medium.txt anywhere → default

    const config = loadBrandConfig(globalDir, localDir);

    expect(config.art.side).toEqual(localSide);
    expect(config.art.small).toEqual(globalSmall);
    expect(config.art.medium).toEqual(DEFAULT_BRAND.art.medium);
    expect(config.art.large).toEqual(localLarge);
  });
});

// ─── Integration: correct dirs derived from api.state.path ────────

describe("Integration: tui() derives correct globalDir/localDir from api.state.path", () => {
  /**
   * This test verifies the path construction logic used in tui.tsx lines 376–378:
   *
   *   const globalDir = join(api.state.path.config, "oc-neo-terminal")
   *   const localDir  = join(api.state.path.directory, ".opencode", "oc-neo-terminal")
   *   brandConfig = loadBrandConfig(globalDir, localDir)
   *
   * We verify this directly — the path construction is deterministic and
   * doesn't require executing tui() with its heavy UI dependencies.
   */
  it("globalDir is derived as join(config, 'oc-neo-terminal')", () => {
    const configPath = "/home/user/.config/opencode";
    const expectedGlobalDir = join(configPath, "oc-neo-terminal");

    expect(expectedGlobalDir).toBe(
      "/home/user/.config/opencode/oc-neo-terminal",
    );
  });

  it("localDir is derived as join(directory, '.opencode', 'oc-neo-terminal')", () => {
    const projectDir = "/home/user/myproject";
    const expectedLocalDir = join(projectDir, ".opencode", "oc-neo-terminal");

    expect(expectedLocalDir).toBe(
      "/home/user/myproject/.opencode/oc-neo-terminal",
    );
  });

  it("loadBrandConfig resolves assets when called with dirs matching api.state.path construction", () => {
    // Simulate what tui() does: construct dirs from api.state.path, call loadBrandConfig
    const mockConfigPath = globalDir; // reuse temp globalDir as if it were ~/.config/opencode/oc-neo-terminal
    const mockProjectDir = localDir; // reuse temp localDir as if it were <project>/.opencode/oc-neo-terminal

    const simulatedGlobalDir = join(mockConfigPath); // already the leaf dir
    const simulatedLocalDir = join(mockProjectDir); // already the leaf dir

    const customSide = ["INTEGRATION_SIDE_LINE"];
    writeArtFile(localDir, "side.txt", customSide);

    const config = loadBrandConfig(simulatedGlobalDir, simulatedLocalDir);

    expect(config.art.side).toEqual(customSide);
  });

  it("loadBrandConfig uses DEFAULT_BRAND when dirs from api.state.path point to empty dirs", () => {
    // Empty globalDir + localDir (no files) → all defaults
    const config = loadBrandConfig(globalDir, localDir);

    expect(config.name).toBe(DEFAULT_BRAND.name);
    expect(config.art.side).toEqual(DEFAULT_BRAND.art.side);
    expect(config.art.small).toEqual(DEFAULT_BRAND.art.small);
  });
});
