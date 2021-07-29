import React from "react";

import default_profile from "../../assets/blank-profile.png"

export default function Contact({ dataContact, clickContact, contact }) {
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`contact mt-3 p-2 ${
                contact?.id === item?.id && "contact-active"
              }`}
              onClick={() => {
                clickContact(item);
              }}
            >
              <img
                src={item.profile?.image || default_profile}
                className="rounded-circle me-2 img-contact"
                alt="user avatar"
              />
              <div className="pt-2">
                <ul className="ps-0 text-contact">
                  <li>{item.name}</li>
                  <li className="text-contact-chat mt-1">{item.message}</li>
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
