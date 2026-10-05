#QuickFind: High-Performance Autocomplete Engine
Building my very own search engine.

QuickFind is a custom-built autocomplete and search engine engineered entirely from scratch, without the use of external search or fuzzy-matching libraries like Fuse.js, Algolia, or Elasticlunr. It features a live-updating dropdown that tolerates typos and provides near-instant suggestions as the user types

Core Features
1.Custom Indexing Structure: Utilizes a custom Trie (Prefix Tree) data structure for fast prefix lookups, bypassing the need for slow linear array scans on every keystroke.
2.Fuzzy Matching & Typo Tolerance: Implements the Levenshtein edit distance algorithm from scratch to catch spelling near-misses (e.g., matching "banama" to "banana").
3.Bounded Search: Optimizes the edit-distance calculations by bounding the search to only evaluate candidates that share a starting prefix, preventing UI freezes on large datasets.
4.Smart Ranking Logic: Exact prefix matches outrank fuzzy matches, and results are deterministically sorted by their mistake score to ensure the most relevant suggestions appear first.   5.Performance Benchmarking: Includes a built-in stopwatch panel that tracks query execution time in milliseconds, proving the engine's sub-50ms responsiveness under load.
6.Debouncing: Prevents excessive queries from firing on every single keystroke during rapid typing. 

Setup and Usage Instructions
1.Clone or Download: Save the index.html, style.css, and script.js files into a single local folder.
2.Launch: Open the index.html file directly in any modern web browser (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge).
3.Usage:
Wait a brief moment for the search bar to display "Type a word..." (this indicates the external dictionary has successfully loaded via the Fetch API).
Begin typing a query. The dropdown will automatically populate with ranked suggestions.
Test the typo tolerance by intentionally misspelling a word by 1 or 2 letters.
Observe the benchmark panel below the search box to view the query execution time.

Technical Architecture
1.Trie (TrieNode & Trie): Acts as the primary memory structure, organizing characters into branching paths for highly efficient lookup times based on the length of the prefix.
2.Dynamic Programming (Edit Distance): A grid-based mathematical approach to calculating the minimum insertions, deletions, and substitutions required to transform the search query into a valid dictionary word.

Credits and External References
Dataset: The live dictionary load relies on the google 370,000 words english repository. We specifically utilize this raw dataset for testing scale. https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt
Educational Resources Referenced: https://en.wikipedia.org/wiki/Trie , https://en.wikipedia.org/wiki/Levenshtein_distance , https://en.wikipedia.org/wiki/Inverted_index
