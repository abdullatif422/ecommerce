import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function page() {
  return <SwaggerUI url="swagger.json" />;
}

export default page;
