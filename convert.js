const fs = require('fs');
const path = require('path');

function convertBookToBookFormat(inputFilePath, outputDirectory) {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(inputFilePath);
    const bookData = JSON.parse(rawData);

    // Check if the input data has the expected structure
    if (!bookData.book || !bookData.chapters || !Array.isArray(bookData.chapters)) {
      throw new Error(`Invalid input JSON format in ${inputFilePath}. Missing "book" or "chapters" or "chapters" is not an array.`);
    }

    const bookName = bookData.book.replace(/\s/g, '').toLowerCase(); // Remove spaces and lowercase for filename
    const outputFilePath = path.join(outputDirectory, `${bookName}.json`);
    const outputData = [];

    // Iterate through chapters and verses
    bookData.chapters.forEach((chapterData) => {
      if (!chapterData.chapter || !chapterData.verses || !Array.isArray(chapterData.verses)) {
        throw new Error(`Invalid chapter format in ${inputFilePath}, chapter ${chapterData.chapter}. Missing "chapter" or "verses" or "verses" is not an array.`);
      }
      chapterData.verses.forEach((verseData) => {
        if (!verseData.verse || !verseData.text) {
          throw new Error(`Invalid verse format in ${inputFilePath}, chapter ${chapterData.chapter}, verse ${verseData.verse}. Missing "verse" or "text".`);
        }
        const reference = `${bookData.book} ${chapterData.chapter}:${verseData.verse}`;
        outputData.push({
          text: verseData.text,
          reference: reference,
          book: bookData.book,
          chapter: parseInt(chapterData.chapter),
          verse: parseInt(verseData.verse),
        });
      });
    });

    // Write the converted data to a new JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
    console.log(`Successfully converted ${bookData.book} to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error converting ${inputFilePath}:`, error.message);
  }
}

function convertMultipleBooks(inputDirectory, outputDirectory) {
  // Ensure the output directory exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Read all files in the input directory
  fs.readdir(inputDirectory, (err, files) => {
    if (err) {
      console.error('Error reading input directory:', err);
      return;
    }

    // Filter for JSON files
    const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

    // Convert each JSON file
    jsonFiles.forEach(file => {
      const inputFilePath = path.join(inputDirectory, file);
      convertBookToBookFormat(inputFilePath, outputDirectory);
    });
  });
}

// Example usage:
const inputDirectory = './data'; // Directory containing your JSON files
const outputDirectory = './src/data'; // Directory where you want to save the converted files

// Ensure the input directory exists
if (!fs.existsSync(inputDirectory)) {
    fs.mkdirSync(inputDirectory, { recursive: true });
    console.log(`Created input directory: ${inputDirectory}`);
}

convertMultipleBooks(inputDirectory, outputDirectory);
