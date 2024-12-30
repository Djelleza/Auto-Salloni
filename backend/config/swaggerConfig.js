const swaggerConfig = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Car Management API',
        version: '1.0.0',
        description: 'API per menaxhimin e makinave ne AutoSallon',
      },
      tags: [
        {
          name: "Cars", 
          description: "Operations related to cars", 
        },
      ],
    },
    apis: ['./controllers/*.js',]
  };

  export default swaggerConfig;