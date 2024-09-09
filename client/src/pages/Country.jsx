import React, { useState } from "react";
import Events from "./Events";

const Country = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <main className="max-w-10xl mx-auto mt-10">
      <div className="text-center my-5">
        <label htmlFor="country" className="block mb-2 text-lg font-bold">
          Select a country:
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="p-2 border rounded"
        >
          <option value="">All Countries</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Italy">Italy</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="France">France</option>
        </select>
      </div>
      <Events country={selectedCountry} hideAddEvent={true} />
    </main>
  );
};

export default Country;
