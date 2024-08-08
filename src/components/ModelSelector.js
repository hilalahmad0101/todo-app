// import React, { useEffect, useState } from "react";
// import { apiBase } from "../../config";

// const ModelSelector = ({ onSelect }) => {
//   const [models, setModels] = useState([]);

//   const userString = localStorage.getItem("user");
//   const user = JSON.parse(userString);
//   const token = user.token;
//   console.log("TOKEN", token);

//   useEffect(() => {
//     const fetchModels = async () => {
//       try {
//         console.log("Sending request to:", `${apiBase}/users/list`);
//         const response = await fetch(`${apiBase}/user/list`, {
//           headers: {
//             "x-access-token": token,
//           },
//         });

//         console.log("Response received:", response);
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Error ${response.status}: ${errorText}`);
//         }

//         const data = await response.json();
//         console.log("Data received:", data);
//         setModels(data);
//       } catch (error) {
//         console.error("Failed to fetch models:", error);
//       }
//     };

//     fetchModels();
//   }, []);

//   return (
//     <select
//       onChange={(e) => onSelect(e.target.value)}
//       defaultValue=""
//       style={{ padding: 5 }}
//     >
//       <option value="" disabled>
//         Select a model
//       </option>
//       {models.data ? (
//         models.data.map((model) => (
//           <option key={model.modelUrn} value={model.modelUrn}>
//             {model.modelName}
//           </option>
//         ))
//       ) : (
//         <option value="" disabled>
//           Loading models...
//         </option>
//       )}
//     </select>
//   );
// };

// export default ModelSelector;

import React, { useEffect, useState } from "react";
import { apiBase } from "../../config";

const ModelSelector = ({ onSelect }) => {
  const [models, setModels] = useState([]);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const token = user.token;
  console.log("TOKEN", token);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log("Sending request to:", `${apiBase}/user/list`);
        const response = await fetch(`${apiBase}/user/list`, {
          headers: {
            "x-access-token": token,
          },
        });

        console.log("Response received:", response);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Data received:", data);
        setModels(data);
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    };

    fetchModels();
  }, [token]);

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
      style={{ padding: 5 }}
    >
      <option value="" disabled>
        Select a model
      </option>
      {models.data ? (
        models.data.map((model) => (
          <option key={model.modelUrn} value={model.modelUrn}>
            {model.modelName}
          </option>
        ))
      ) : (
        <option value="" disabled>
          Loading models...
        </option>
      )}
    </select>
  );
};

export default ModelSelector;
