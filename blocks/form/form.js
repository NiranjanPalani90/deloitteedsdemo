function submitForm() {
  const formElements = document.querySelector('.form-grid').elements;
  const firstName = formElements.item(1).value;
  const lastName = formElements.item(2).value;
  // const dob = formElements.item(3).value;
  const pan = formElements.item(4).value;
  const email = formElements.item(5).value;
  const mobile = formElements.item(6).value;
  // const pinCode = formElements.item(7).value;
  const id = Math.ceil(Math.random() * 10000);
  const customerAccountNumberID = Math.ceil(Math.random()*1000000000);
  // const gender = formElements.item(7).value;
  const city = formElements.item(11).value;
  // const country =  formElements.item(12).value;
  const planName = 'platinum';
  const payload = {
    '_id': id,
    'customerAccountNumberID': customerAccountNumberID,
    'customerAccountNumber': '00120241090',
    'PanCard': pan,
    'AadharNumber': '0987633475422',
    'firstName': firstName,
    'lastName': lastName,
    'city': city,
    'country': 'India',
    'postalCode': 110005,
    'gender': 'male',
    'email' : email,
    'mobileNumer' : mobile,
    'planName' : planName,
  };
  fetchData(payload);
}
async function fetchData(payload_data) {
  const response = await fetch("https://dcs.adobedc.net/collection/f5266c1a71a9b29facc5eb1c0112a640dbd335e0d022c3a15f6ffddfbaf359be", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-adobe-flow-id": '67655120-2a2e-4111-b4b9-9b8221810b03',
    },
    body: JSON.stringify({ payload_data }),
  });
  const data = await response.json();
  console.log(data);
}

export default function decorate(block) {
  const form = document.createElement('form');
  form.className = 'form-grid';
  const fields = [
    {
      label: 'Title',
      type: 'select',
      id: 'title',
      options: ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof', 'None'],
      required: true,
    },
    { label: 'First Name', type: 'text', id: 'firstName', required: true },
    { label: 'Last Name', type: 'text', id: 'lastName', required: true },
    { label: 'Date of Birth', type: 'date', id: 'dob', required: true },
    { label: 'PAN', type: 'text', id: 'pan', required: true },
    { label: 'Email', type: 'email', id: 'email', required: true },
    { label: 'Mobile Number', type: 'tel', id: 'mobile', required: true },
    {
      label: 'Gender',
      type: 'select',
      id: 'gender',
      options: ['Male', 'Female'],
      required: true,
    },
    {
      label: 'Current Address Pin Code',
      type: 'text',
      id: 'pinCode',
      required: true,
    },
    {
      label: 'Current Address Line 1',
      type: 'text',
      id: 'address1',
      required: true,
    },
    { label: 'Current Address Line 2', type: 'text', id: 'address2' },
    { label: 'Current Address Line 3', type: 'text', id: 'address3' },
    { label: 'City', type: 'text', id: 'city', required: true },
    { label: 'State', type: 'text', id: 'state', required: true },
    {
      label: 'Employee Status',
      type: 'select',
      id: 'employeeStatus',
      options: ['Employed', 'Unemployed', 'Student', 'Retired'],
      required: true,
    },
    {
      label: 'I understand about data collection',
      type: 'checkbox',
      id: 'understand',
      required: true,
    },
  ];

  fields.forEach((field) => {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    const label = document.createElement('label');
    label.htmlFor = field.id;
    label.innerText = field.label;
    formGroup.appendChild(label);

    if (field.type === 'select') {
      const select = document.createElement('select');
      select.id = field.id;
      select.name = field.id;
      select.required = field.required;

      field.options.forEach((optionText) => {
        const option = document.createElement('option');
        option.value = optionText.toLowerCase();
        option.innerText = optionText;
        select.appendChild(option);
      });

      formGroup.appendChild(select);
    } else if (field.type === 'checkbox') {
      const input = document.createElement('input');
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      input.required = field.required;

      formGroup.appendChild(input);

      const checkboxLabel = document.createElement('label');
      checkboxLabel.htmlFor = field.id;
      checkboxLabel.className = 'checkbox-label';
      checkboxLabel.innerText = field.label;
      formGroup.appendChild(checkboxLabel);
    } else {
      const input = document.createElement('input');
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      input.required = field.required;

      formGroup.appendChild(input);
    }

    form.appendChild(formGroup);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'submitButton';
  submitButton.innerText = 'Submit';
  form.appendChild(submitButton);
  block.append(form);
  document.querySelectorAll('.submitButton').forEach((button) => {
    button.addEventListener('click', submitForm);
  });
}
