// DOM Elements
const weeksInput = document.getElementById('weeks');
const weeksValue = document.getElementById('weeks-value');
const priceBody = document.getElementById('price-body');
const courseRadios = document.querySelectorAll('input[name="course"]');
const tableHeaders = document.querySelectorAll('th.sortable');

// Fetch Data from JSON
let pricingData = [];
const baseApiUrl = './'; // Simulated API root folder

async function fetchData(courseType) {
  const file = courseType === 'general' ? 'general_prices.json' : 'intensive_prices.json';
  const response = await fetch(`${baseApiUrl}${file}`);
  const data = await response.json();
  pricingData = data.pricingData;
  renderTable(weeksInput.value);
}

// Find Applicable Discount
function getApplicableDiscount(discounts, weeks) {
  discounts.sort((a, b) => b.duration - a.duration);
  for (let discount of discounts) {
    if (weeks >= discount.duration) {
      return discount.discount;
    }
  }
  return 1; // No discount, full price
}

// Calculate Offer Price Based on Weeks
function calculateOfferPrice(basePrice, discounts, weeks) {
  const applicableDiscount = getApplicableDiscount(discounts, weeks);
  return Math.round(basePrice * applicableDiscount * weeks);
}

// Render Table
function renderTable(weeks, sortColumn = null, sortOrder = 'asc') {
  priceBody.innerHTML = ''; // Clear table

  let data = pricingData.map(item => {
    const offerPrice = calculateOfferPrice(item.basePrice, item.discounts, weeks);
    return {
      ...item,
      offerPrice: offerPrice,
      totalPrice: offerPrice + item.extras
    };
  });

  // Sort Data if Column is Clicked
  if (sortColumn) {
    data.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
    });
  }

  // Populate Table Rows
  data.forEach(item => {
    const row = `
      <tr>
        <td>${item.academy}</td>
        <td>${item.basePrice.toLocaleString()} €</td>
        <td><strong>${item.offerPrice.toLocaleString()} €</strong></td>
        <td>${item.extras.toLocaleString()} €</td>
        <td>${item.condition}</td>
      </tr>
    `;
    priceBody.innerHTML += row;
  });
}

// Handle Sorting
let currentSort = { column: null, order: 'asc' };

tableHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const column = header.getAttribute('data-column');
    const order = currentSort.column === column && currentSort.order === 'asc' ? 'desc' : 'asc';
    currentSort = { column, order };
    renderTable(weeksInput.value, column, order);
  });
});

// Event Listeners
weeksInput.addEventListener('input', () => {
  const weeks = weeksInput.value;
  weeksValue.textContent = `${weeks} semanas`;
  renderTable(weeks);
});

courseRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const selectedCourse = document.querySelector('input[name="course"]:checked').value;
    fetchData(selectedCourse);
  });
});

// Initial Fetch
fetchData('general'); // Default to Inglés General
