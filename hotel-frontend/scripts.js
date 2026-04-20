console.log("hotels");

const apiUrl = "http://127.0.0.1:8080";

async function getRooms() {
    const res = await fetch(`${apiUrl}/rooms`);
    const rooms = await res.json();
    console.log("rooms", rooms);
    for (const room of rooms) {
        document.getElementById("room-list").innerHTML += `
            <option value="${room.id}">${room.room_number} - ${room.type} - ${room.price} €</option>
        `;
    }
}
getRooms();

async function getBookings() {
    const res = await fetch(`${apiUrl}/bookings`);
    const bookings = await res.json();
    console.log(bookings);
    document.getElementById("bookings-list").innerHTML = "";
    for (const booking of bookings) {
        document.getElementById("bookings-list").innerHTML += `
            <li>Room ${booking.room_number} - From: ${booking.datefrom} To: ${booking.dateto} - Nights: ${booking.nights} - Guest: ${booking.guest} - Price: ${booking.price} € - Info: ${booking.addinfo}</li>
        `;
    }
}
getBookings();
async function getGuests() {
    const res = await fetch(`${apiUrl}/guests`);
    const guests = await res.json();

    console.log(guests)

    for (guest of guests) {
        document.getElementById("guest-list").innerHTML += `
            <option value="${guest.id}">
                ${guest.firstname} - 
                ${guest.lastname} (${guest.prev_visits} previous visits)
            </option>
        `;
    }
}
getGuests();


async function saveBooking() {
    const booking = {
        room_id: document.getElementById("room-list").value,
        guest_id: document.getElementById("guest-list").value,
        datefrom: document.getElementById("datefrom").value,
        dateto: document.getElementById("dateto").value,
        addinfo: document.getElementById("info").value
    };

    const res = await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    const resData = await res.json();
    console.log(resData);
    getBookings();
}

document.getElementById('btn-save').addEventListener('click', saveBooking);