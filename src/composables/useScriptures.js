import { ref } from "vue";
import lunr from "lunr";

import john from "@/data/john.json"; // Corrected path
import romans from "@/data/romans.json"; // Corrected path
import psalms from "@/data/psalms.json"; // Corrected path
import firstcorinthians from "@/data/firstcorinthians.json"; // Corrected path
import secondcorinthians from "@/data/secondcorinthians.json"; // Corrected path
import galatians from "@/data/galatians.json"; // Corrected path
import ephesians from "@/data/ephesians.json"; // Corrected path
import philippians from "@/data/philippians.json"; // Corrected path
import colossians from "@/data/colossians.json"; // Corrected path
import firstthessalonians from "@/data/firstthessalonians.json"; // Corrected path
import secondthessalonians from "@/data/secondthessalonians.json"; // Corrected path
import firsttimothy from "@/data/firsttimothy.json"; // Corrected path
import secondtimothy from "@/data/secondtimothy.json"; // Corrected path
import titus from "@/data/titus.json"; // Corrected path
import philemon from "@/data/philemon.json"; // Corrected path
import hebrews from "@/data/hebrews.json"; // Corrected path
import james from "@/data/james.json"; // Corrected path
import firstpeter from "@/data/firstpeter.json"; // Corrected path
import secondpeter from "@/data/secondpeter.json"; // Corrected path
import firstjohn from "@/data/firstjohn.json"; // Corrected path
import secondjohn from "@/data/secondjohn.json"; // Corrected path
import thirdjohn from "@/data/thirdjohn.json"; // Corrected path
import jude from "@/data/jude.json"; // Corrected path
import revelation from "@/data/revelation.json"; // Corrected path
import acts from "@/data/acts.json"; // Corrected path
import matthew from "@/data/matthew.json"; // Corrected path
import mark from "@/data/mark.json"; // Corrected path
import luke from "@/data/luke.json"; // Corrected path
import genesis from "@/data/genesis.json"; // Corrected path
import exodus from "@/data/exodus.json"; // Corrected path
import joshua from "@/data/joshua.json"; // Corrected path
import judges from "@/data/judges.json"; // Corrected path
import zephaniah from "@/data/zephaniah.json"; // Corrected path
import zechariah from "@/data/zechariah.json"; // Corrected path
import malachi from "@/data/malachi.json"; // Corrected path
import nahum from "@/data/nahum.json"; // Corrected path
import micah from "@/data/micah.json"; // Corrected path
import obadiah from "@/data/obadiah.json"; // Corrected path
import jonah from "@/data/jonah.json"; // Corrected path
import haggai from "@/data/haggai.json"; // Corrected path
import habakkuk from "@/data/habakkuk.json"; // Corrected path
import joel from "@/data/joel.json"; // Corrected path
import ezekiel from "@/data/ezekiel.json"; // Corrected path
import daniel from "@/data/daniel.json"; // Corrected path
import lamentations from "@/data/lamentations.json"; // Corrected path
import leviticus from "@/data/leviticus.json"; // Corrected path
import numbers from "@/data/numbers.json"; // Corrected path
import ruth from "@/data/ruth.json"; // Corrected path
import songofsolomon from "@/data/songofsolomon.json"; // Corrected path
import ecclesiastes from "@/data/ecclesiastes.json"; // Corrected path
import isaiah from "@/data/isaiah.json"; // Corrected path
import amos from "@/data/amos.json"; // Corrected path
import hosea from "@/data/hosea.json"; // Corrected path
import proverbs from "@/data/proverbs.json"; // Corrected path
import firstsamuel from "@/data/firstsamuel.json"; // Corrected path
import secondsamuel from "@/data/secondsamuel.json"; // Corrected path
import firstkings from "@/data/firstkings.json"; // Corrected path
import secondkings from "@/data/secondkings.json"; // Corrected path
import firstchronicles from "@/data/firstchronicles.json"; // Corrected path
import secondchronicles from "@/data/secondchronicles.json"; // Corrected path
import esther from "@/data/esther.json"; // Corrected path
import jeremiah from "@/data/jeremiah.json"; // Corrected path

export function useScriptures() {
  const allScriptures = ref([]);
  const index = ref(null);
  const indexReady = ref(false);

  const loadScriptures = async () => {
    return new Promise((resolve) => {
      allScriptures.value = [
        ...john,
        ...romans,
        ...firstcorinthians,
        ...secondcorinthians,
        ...galatians,
        ...ephesians,
        ...psalms,
        ...jeremiah,
        ...philippians,
        ...colossians,
        ...firstthessalonians,
        ...secondthessalonians,
        ...firsttimothy,
        ...secondtimothy,
        ...titus,
        ...philemon,
        ...hebrews,
        ...james,
        ...firstpeter,
        ...secondpeter,
        ...firstjohn,
        ...secondjohn,
        ...thirdjohn,
        ...jude,
        ...revelation,
        ...acts,
        ...matthew,
        ...mark,
        ...luke,
        ...genesis,
        ...exodus,
        ...joshua,
        ...judges,
        ...ruth,
        ...zephaniah,
        ...zechariah,
        ...malachi,
        ...nahum,
        ...micah,
        ...obadiah,
        ...jonah,
        ...haggai,
        ...habakkuk,
        ...joel,
        ...esther,
        ...ezekiel,
        ...daniel,
        ...lamentations,
        ...leviticus,
        ...numbers,
        ...songofsolomon,
        ...ecclesiastes,
        ...isaiah,
        ...amos,
        ...hosea,
        ...proverbs,
        ...firstsamuel,
        ...secondsamuel,
        ...firstkings,
        ...secondkings,
        ...firstchronicles,
        ...secondchronicles,
      ];
      createIndex();
      resolve(); // Resolve the promise after loading
    });
  };



  const createIndex = () => {
    index.value = lunr(function () {
      this.ref('reference');
      this.field('text');
      this.field('book');
      this.field('chapter');
      this.field('verse');

      allScriptures.value.forEach(function (doc) {
        this.add(doc);
      }, this);
    });
    indexReady.value = true;
  };
    
  
  
  const getRandomScripture = () => {
    if (allScriptures.value.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allScriptures.value.length);
    return allScriptures.value[randomIndex];
  };
  const getVersesInRange = (book, chapter, startVerse, endVerse) => {
    return allScriptures.value.filter(
      (scripture) =>
        scripture.book.toLowerCase() === book.toLowerCase() &&
        scripture.chapter === chapter &&
        scripture.verse >= startVerse &&
        scripture.verse <= endVerse
    );
  };

  const searchScriptures = (query) => {
    if (!index.value) return []; // Handle case where index isn't ready
    const results = index.value.search(query);
    return results.map((result) => allScriptures.value.find((s) => s.reference === result.ref));
  };


  return { allScriptures, index, loadScriptures,getRandomScripture, getVersesInRange };
}
