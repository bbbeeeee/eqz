def get_missing_letters(sentence):
    letters = {"a": False, "b": False, "c": False, "d": False, "e": False, "f": False, "g": False, "h": False, "i": False, "j": False, "k": False, "l": False, "m": False, "n": False, "o": False, "p": False, "q": False, "r": False, "s": False, "t": False, "u": False, "v": False, "w": False, "x": False, "y": False, "z": False}
    missing = ""

    sentence_letters = list(sentence.lower().replace(" ", ""))

    for i in sentence_letters:
        if i in letters:
            del letters[i]

    if len(letters) == 0:
        return missing
    else:
        for letter, value in letters.viewitems():
            missing += letter
        return missing

print get_missing_letters("The quick brown fox jumps over the lazy dog.")

