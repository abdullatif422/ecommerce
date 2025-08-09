// app/swagger/page.tsx

'use client'; // This component needs to be client-side to render Swagger UI

import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { useRouter } from 'next/navigation';

export default function SwaggerPage() {
  const [spec, setSpec] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the OpenAPI specification from your API route.
    fetch('/api/swagger')
      .then((res) => res.json())
      .then((data) => {
        setSpec(data);
      })
      .catch((err) => {
        console.error('Failed to fetch OpenAPI spec:', err);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Conditionally render SwaggerUI only after the spec is loaded */}
      {spec ? (
        <SwaggerUI spec={spec} />
      ) : (
        <div className="flex items-center justify-center h-screen text-gray-500">
          Loading Swagger UI...
        </div>
      )}
    </div>
  );
}
