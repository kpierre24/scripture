import json
import os

class ScriptureSearch:
    def __init__(self, filepath):
        """
        Initializes the ScriptureSearch object with the path to the JSON file.

        Args:
            filepath (str): The path to the JSON file containing scripture data.
        """
        self.filepath = filepath
        self.data = self.load_data()

    def load_data(self):
        """
        Loads the scripture data from the JSON file.

        Returns:
            list: A list of dictionaries, where each dictionary represents a scripture verse.
        """
        try:
            with open(self.filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Error: File not found at {self.filepath}")
            return []
        except json.JSONDecodeError:
            print(f"Error: Invalid JSON format in {self.filepath}")
            return []

    def search_by_reference(self, reference):
        """
        Searches for scripture verses by their full reference (e.g., "Acts 1:1").

        Args:
            reference (str): The full reference to search for.

        Returns:
            list: A list of matching scripture verses (dictionaries).
        """
        results = []
        for verse in self.data:
            if verse["reference"] == reference:
                results.append(verse)
        return results

    def search_by_book(self, book):
        """
        Searches for scripture verses by book name (e.g., "Acts").

        Args:
            book (str): The book name to search for.

        Returns:
            list: A list of matching scripture verses (dictionaries).
        """
        results = []
        for verse in self.data:
            if verse["book"].lower() == book.lower():
                results.append(verse)
        return results

    def search_by_text(self, text):
        """
        Searches for scripture verses by text content.

        Args:
            text (str): The text to search for within the verses.

        Returns:
            list: A list of matching scripture verses (dictionaries).
        """
        results = []
        for verse in self.data:
            if text.lower() in verse["text"].lower():
                results.append(verse)
        return results

    def search_by_chapter(self, book, chapter):
        """
        Searches for scripture verses by book and chapter.

        Args:
            book (str): The book name.
            chapter (int): The chapter number.

        Returns:
            list: A list of matching scripture verses (dictionaries).
        """
        results = []
        for verse in self.data:
            if verse["book"].lower() == book.lower() and verse["chapter"] == chapter:
                results.append(verse)
        return results

    def search_by_verse(self, book, chapter, verse_num):
        """
        Searches for a specific scripture verse by book, chapter, and verse number.

        Args:
            book (str): The book name.
            chapter (int): The chapter number.
            verse_num (int): The verse number.

        Returns:
            list: A list of matching scripture verses (dictionaries).
        """
        results = []
        for verse in self.data:
            if (
                verse["book"].lower() == book.lower()
                and verse["chapter"] == chapter
                and verse["verse"] == verse_num
            ):
                results.append(verse)
        return results


# Example Usage (assuming the file is in the specified location):
filepath = r"c:\Users\Administrator\scripture\data\acts.json"  # Replace with your actual filepath if different
if os.path.exists(filepath):
    searcher = ScriptureSearch(filepath)

    # Search by reference
    reference_results = searcher.search_by_reference("Acts 1:1")
    print("\nSearch by Reference (Acts 1:1):")
    for result in reference_results:
        print(result)

    # Search by book
    book_results = searcher.search_by_book("Acts")
    print("\nSearch by Book (Acts):")
    for result in book_results[:5]:  # Print only the first 5 for brevity
        print(result)
    print(f"...and {len(book_results)-5} more")

    # Search by text
    text_results = searcher.search_by_text("Holy Ghost")
    print("\nSearch by Text (Holy Ghost):")
    for result in text_results[:5]:  # Print only the first 5 for brevity
        print(result)
    print(f"...and {len(text_results)-5} more")

    # Search by chapter
    chapter_results = searcher.search_by_chapter("Acts", 2)
    print("\nSearch by Chapter (Acts 2):")
    for result in chapter_results[:5]:  # Print only the first 5 for brevity
        print(result)
    print(f"...and {len(chapter_results)-5} more")

    # Search by verse
    verse_results = searcher.search_by_verse("Acts", 2, 38)
    print("\nSearch by Verse (Acts 2:38):")
    for result in verse_results:
        print(result)
else:
    print("File not found, please check the path")
