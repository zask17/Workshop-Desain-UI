async function fetchChemistryData() {
  const input = document.getElementById('chemInput').value.trim();
  const resultDiv = document.getElementById('result');
  const loader = document.getElementById('loader');

  if (!input) {
    alert("Harap masukkan nama unsur atau senyawa!");
    return;
  }

  // Reset UI
  resultDiv.style.display = 'none';
  loader.style.display = 'block';

  try {
    // Step 1: Ambil CID (Compound ID) dari nama
    const cidResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${input}/cids/JSON`);
    const cidData = await cidResponse.json();

    if (!cidData.IdentifierList) {
      throw new Error("Senyawa tidak ditemukan.");
    }

    const cid = cidData.IdentifierList.CID[0];

    // Step 2: Ambil Properti Data menggunakan CID
    const detailResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`);
    const detailData = await detailResponse.json();
    const props = detailData.PropertyTable.Properties[0];

    // Update UI
    document.getElementById('compName').innerText = input.toUpperCase();
    document.getElementById('formula').innerText = props.MolecularFormula;
    document.getElementById('weight').innerText = props.MolecularWeight + " g/mol";
    document.getElementById('iupac').innerText = props.IUPACName || "N/A";
    document.getElementById('cid').innerText = props.CID;

    // Ambil gambar struktur 2D
    document.getElementById('compImg').src = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`;

    loader.style.display = 'none';
    resultDiv.style.display = 'block';

  } catch (error) {
    loader.style.display = 'none';
    alert("Error: " + error.message);
  }
}

// Fitur Enter untuk mencari
document.getElementById('chemInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') fetchChemistryData();
});