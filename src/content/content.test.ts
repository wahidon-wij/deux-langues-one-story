import { describe, expect, it } from "vitest";

import { content } from "./content";

describe("public project facts", () => {
  it("does not publish the unverified five-minute result", () => {
    const featured = content.fr.projects.items.find((project) => project.slug === "environnements-ephemeres");

    expect(featured?.result).toBeUndefined();
  });

  it("lists Angular as the CityBus front-end", () => {
    const cityBus = content.fr.projects.items.find((project) => project.slug === "citybus");

    expect(cityBus?.stack).toContain("Angular");
    expect(cityBus?.stack).not.toContain("React");
  });
});