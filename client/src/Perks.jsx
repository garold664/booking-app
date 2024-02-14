import React, { useEffect } from 'react';

export default function Perks({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((perk) => perk !== name));
    }
  }

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="wifi"
          onChange={handleCbClick}
          checked={selected.includes('wifi')}
        />
        <span>WiFi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="parking"
          onChange={handleCbClick}
          checked={selected.includes('parking')}
        />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="tv"
          onChange={handleCbClick}
          checked={selected.includes('tv')}
        />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="radio"
          onChange={handleCbClick}
          checked={selected.includes('radio')}
        />
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="pets"
          onChange={handleCbClick}
          checked={selected.includes('pets')}
        />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="entrance"
          onChange={handleCbClick}
          checked={selected.includes('entrance')}
        />
        <span>Private Entrance</span>
      </label>
    </>
  );
}
