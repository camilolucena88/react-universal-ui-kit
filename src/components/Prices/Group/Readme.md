# Group Prices Component

The idea is to use it with HTML to display prices (ideally 3 per item)

### How to implement
```html
<div
    class="group-prices-component"
    data-ids="1,2,3,4,5,1,2,3,4"
    data-tab-titles="Online,Onsite,Malta"
    data-lang="es-es"
    data-btn-msg="Ver más"
    data-url="http://localhost:8000"></div>
<script>
  // Handle the plan selection
  document.querySelector('.group-prices-component').addEventListener('planSelected', (event) => {
    const { plan, tabType, timestamp } = event.detail;
    if(plan.pk) {
      console.log(plan, tabType, timestamp)
    }
    // Do something with the selected plan data
  });
</script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        document.querySelector('.group-prices-component').addEventListener('planSelected', (event) => {
            const {plan, tabType, timestamp} = event.detail;
            console.log(plan, tabType, timestamp)
        });
    }
</script>
```