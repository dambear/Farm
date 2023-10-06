import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const WeatherAnnouncementCombo = () => {
  // ... (same as before)

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg max-w-md mx-auto mt-8">
      <Select
        className="mb-4"
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
      />
      {selectedOption === null && <p className="text-gray-600">Select an option</p>}
      {selectedOption?.value === 'weather' && (
        <div className="mt-4">
          {weatherData.map((weather) => (
            <div key={weather.id} className="mb-2">
              <span className="font-semibold">Description:</span> {weather.description}
            </div>
          ))}
        </div>
      )}
      {selectedOption?.value === 'announcements' && (
        <div className="mt-4">
          {announcementData.map((announcement) => (
            <div key={announcement.id} className="mb-2">
              <span className="font-semibold">Announcement:</span> {announcement.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherAnnouncementCombo;
