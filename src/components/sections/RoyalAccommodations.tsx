"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { img } from "@/lib/media";

const groups = [
  {
    label: "Suites",
    rooms: [
      { name: "Royal Loft Suite", category: "Star Class", ship: "Wonder of the Seas", photo: "royal-loft.jpg", description: "A two-level suite with sweeping sea views and personalized Royal Genie service." },
      { name: "Ultimate Family Townhouse", category: "Star Class", ship: "Icon of the Seas", photo: "ultimate-family-townhouse.jpg", description: "A three-level family suite with two bedrooms and a slide right inside." },
      { name: "Crown Loft Suite", category: "Sky Class", ship: "Wonder of the Seas", photo: "crown-loft.jpg", description: "A two-level retreat with a private balcony and suite concierge service." },
      { name: "Junior Suite", category: "Sea Class", ship: "Harmony of the Seas", photo: "junior-suite.jpg", description: "An inviting first step into suite travel, with room to unwind and a private balcony." }
    ]
  },
  {
    label: "Staterooms",
    rooms: [
      { name: "Ocean View Balcony", category: "Stateroom", ship: "Wonder of the Seas", photo: "ocean-view-balcony.jpg", description: "A private balcony gives you a place to enjoy the ocean air. This example shows a connecting stateroom." },
      { name: "Ocean View Stateroom", category: "Stateroom", ship: "Oasis of the Seas", photo: "ocean-view-stateroom.jpg", description: "A window brings in daylight and frames the sea." },
      { name: "Interior Stateroom", category: "Stateroom", ship: "Harmony of the Seas", photo: "interior-stateroom.jpg", description: "A comfortable, windowless room for unwinding after a day on board." }
    ]
  },
  {
    label: "Accessible",
    rooms: [
      { name: "Accessible Junior Suite", category: "Cabin", ship: "Wonder of the Seas", photo: "accessible-junior-suite.jpg", description: "Bedroom and sitting area in Royal Caribbean’s accessible Junior Suite, cabin 14256." },
      { name: "Bathroom features", category: "Accessible Junior Suite", ship: "Wonder of the Seas", photo: null, description: "Royal Caribbean lists a wide bathroom door, a roll-in shower, a fold-down shower bench, and a handheld showerhead." }
    ]
  }
] as const;

const photoPath = (name: string) => img(`royal-caribbean/${name}`);

export default function RoyalAccommodations({ logo }: { logo: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [group, setGroup] = useState(0);
  const [roomIndex, setRoomIndex] = useState(0);
  const rooms = groups[group].rooms;
  const roomLabel = group === 0 ? "suite" : group === 1 ? "stateroom" : "accessible cabin detail";
  const room = rooms[roomIndex];

  function selectGroup(index: number) {
    setGroup(index);
    setRoomIndex(0);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
        next = (index + (event.key === "ArrowRight" ? 1 : groups.length - 1)) % groups.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = groups.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectGroup(next);
    tabRefs.current[next]?.focus();
  }

  function moveRoom(offset: number) {
    setRoomIndex((current) => (current + offset + rooms.length) % rooms.length);
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="btn btn-ink royal-rooms-trigger" aria-haspopup="dialog" onClick={() => {
        selectGroup(0);
        dialogRef.current?.showModal();
      }}>
        Explore Rooms &amp; Suites <span aria-hidden="true">→</span>
      </button>

      <dialog ref={dialogRef} className="royal-rooms-dialog" aria-labelledby="royal-rooms-heading" onClose={() => triggerRef.current?.focus({ preventScroll: true })} onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="royal-rooms-content">
          <header className="royal-rooms-header">
            <div className="royal-dialog-brand">
              <img src={img(logo)} alt="" width={34} height={34} />
              <span>Dean On Deck Cruise Travel</span>
            </div>
            <h3 id="royal-rooms-heading">Royal Caribbean rooms &amp; suites</h3>
            <button autoFocus className="royal-rooms-close" type="button" aria-label="Close rooms and suites" onClick={() => dialogRef.current?.close()}>×</button>
          </header>

          <div className="royal-rooms-tabs" role="tablist" aria-label="Accommodations" aria-orientation="horizontal">
            {groups.map(({ label }, index) => (
              <button key={label} type="button" id={`royal-rooms-tab-${index}`} role="tab" aria-selected={group === index} aria-controls={`royal-rooms-panel-${index}`} tabIndex={group === index ? 0 : -1}
                ref={(button) => { tabRefs.current[index] = button; }}
                onClick={() => selectGroup(index)} onKeyDown={(event) => handleTabKey(event, index)}>
                {label}
              </button>
            ))}
          </div>

          {groups.map(({ label }, index) => (
            <div key={label} id={`royal-rooms-panel-${index}`} role="tabpanel" aria-labelledby={`royal-rooms-tab-${index}`} hidden={group !== index} tabIndex={0}>
              {group === index && (
                <div className="royal-room-selection">
                  {room.photo && <img className="royal-room-photo" src={photoPath(room.photo)} alt={`${room.name} on ${room.ship}`} width={1500} height={1000} />}
                  <div className="royal-room-details" aria-live="polite">
                    <p className="royal-room-meta">{room.category} <span aria-hidden="true">·</span> {room.ship}</p>
                    <h4>{room.name}</h4>
                    <p>{room.description}</p>
                  </div>
                  {rooms.length > 1 && (
                    <div className="royal-room-nav" aria-label={`Browse ${groups[group].label.toLowerCase()}`}>
                      <button type="button" aria-label={`Previous ${roomLabel}`} onClick={() => moveRoom(-1)}>←</button>
                      <span>{roomIndex + 1} / {rooms.length}</span>
                      <button type="button" aria-label={`Next ${roomLabel}`} onClick={() => moveRoom(1)}>→</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <a className="royal-room-plan" href="/plan/?line=Royal%20Caribbean">Plan with Dean <span aria-hidden="true">→</span></a>
        </div>
      </dialog>
    </>
  );
}
