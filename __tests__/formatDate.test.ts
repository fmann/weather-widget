import formatDate from "../src/utils/formatDate";

describe("formatDate", () => {
  it("should format the date correctly", () => {
    const dateString = "2022-01-01T00:00:00-08:00";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("Jan 1");
  });

  it("should handle different date formats", () => {
    const dateString = "2022-12-31T00:00:00-08:00";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("Dec 31");
  });

  it("should handle invalid date strings", () => {
    const dateString = "invalid-date";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toContain("Invalid Date");
  });

  it("should handle empty date strings", () => {
    const dateString = "";
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("Invalid Date NaN");
  });

  it("should handle undefined date strings", () => {
    const dateString = undefined;
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe("Invalid Date NaN");
  });
});
