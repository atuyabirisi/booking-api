const getAvailableProperties = {
  name: "getAvailableProperties",

  description: `
    Checks which Bethany Cushy Homes properties are available for a guest's
    requested check-in and check-out dates. Use this tool whenever a guest
    asks which rooms or properties are available for specific dates.
  `,

  parameters: {
    type: "object",

    properties: {
      checkIn: {
        type: "string",
        description:
          "Guest check-in date in YYYY-MM-DD format, for example 2026-10-10.",
      },

      checkOut: {
        type: "string",
        description:
          "Guest check-out date in YYYY-MM-DD format, for example 2026-10-12.",
      },
    },

    required: ["checkIn", "checkOut"],
  },
};

export default getAvailableProperties;
