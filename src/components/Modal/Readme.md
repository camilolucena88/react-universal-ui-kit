```html
<!-- Modal containers with dynamic content -->
  <div id="modal-test" style="display: none" class="modal-component" data-open="false">
    <div class="title">Modal Title 1</div>
    <div class="description">
      <p>This is the description for modal 1.</p>
    </div>
    <div class="footer">
      <button>Footer Button 1</button>
    </div>
  </div>
  <button onclick="toggleModal('modal-test')">Toggle Modal 1</button>

  <div id="modal-test-1" style="display: none" class="modal-component" data-open="false">
    <div class="title">Modal Title 2</div>
    <div class="description">
      <form action="">
        <input type="text" name="test">
        <input type="text" name="test2">
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
  <button onclick="toggleModal('modal-test-1')">Toggle Modal 2</button>
<script>
  function toggleModal(modalId) {
    const modalElement = document.getElementById(modalId);
    const isOpen = modalElement.getAttribute('data-open') === 'true';
    modalElement.setAttribute('data-open', (!isOpen).toString());
  }
</script>
```