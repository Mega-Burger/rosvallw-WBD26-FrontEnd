console.log("hotels");

const apiUrl = "http://127.0.0.1:8080";

async function getRooms() {
    const res = await fetch(`${apiUrl}/rooms`);
    const rooms = await res.json();
    for (const room of rooms) {
        document.getElementById("room-list").innerHTML += `
            <option value="${room.id}">${room.room_number} - ${room.room_type} - ${room.price} €</option>
        `;
    }
}
getRooms();

async function getBookings() {
    const res = await fetch(`${apiUrl}/bookings`);
    const bookings = await res.json();
    document.getElementById("bookings-list").innerHTML = "";
    for (const booking of bookings) {
        document.getElementById("bookings-list").innerHTML += `
            <li>Booking #${booking.id} - From: ${booking.datefrom} To: ${booking.dateto} - Info: ${booking.info}</li>
        `;
    }
}
getBookings();

async function saveBooking() {
    const booking = {
        room_id: parseInt(document.getElementById("room-list").value),
        guest_id: 1,
        datefrom: document.getElementById("datefrom").value,
        dateto: document.getElementById("dateto").value,
        info: document.getElementById("info").value
    };
    const res = await fetch(`${apiUrl}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });
    const resData = await res.json();
    console.log(resData);
    getBookings();
}

document.getElementById("btn-save").addEventListener("click", saveBooking);
