export const reducer = (state, action) => {
    if(action.type === 'INITIALIZED') return { ...state, start: true}

    if(action.type === 'INIT') {
        return {
            ...action.stt
        }
    }

    if(action.type === 'SAVE_ANSWER_TO_STATE') {
        const data = action.data;
        const answer = data[state.difficulty][`pzz_${state.level}`].answer; 

        return {
            ...state,
            answer: answer.toUpperCase()
        }
    }

    if(action.type === 'ADD_LETTER') {
        return {
            ...state,
            default: [
                ...state.default,
                action.letter
            ]
        }
    }

    if(action.type === 'MERGE_ANSWER_AND_RANDOM') {
        const _letters = [...state.default, ...state.answer];

        _letters.forEach((lttr, i) => {
            const cont = Math.floor(Math.random() * action.max);
            const randValue = _letters[cont];

            _letters.splice(cont, 1, lttr);
            _letters.splice(i, 1, randValue);
        });

        return {
            ...state,
            default: _letters
        }
    }

    if(action.type === 'CHANGE_DEFAULT_ARRAY_LETTER') {
        const arr = state.default;
        arr[action.id] = action.value;

        return {
            ...state,
            default: [...arr]
        }
    }

    if(action.type === 'CHANGE_EMPTY_SLOT_LETTER') {
        const arr = state.emptySlot;
        arr[action.id] = [ undefined, '' ];

        return {
            ...state,
            emptySlot: [...arr]
        }
    }

    if(action.type === 'UPDATE_EMPTY_SLOT') {
        const slotsLetter = state.emptySlot;
        slotsLetter[state.firstEmptySlotNo] = [ action.id, action.value ];
        
        return {
            ...state,
            emptySlot: [...slotsLetter]
        }
    }
    
    if(action.type === 'UPDATE_EMPTY_SLOT_NO') {
        let index = -1;

        for(let i = 0; i < state.emptySlot.length; i++) {
            const [id, char] = state.emptySlot[i];
            if(char === '') {
                index = i;
                break;
            }
        }

        return {
            ...state,
            firstEmptySlotNo: index
        }
    }

    if(action.type === 'INITIALIZE_EMPTY_SLOTS') {
        const emptySlot = [];
        const length = state.answer.length;

        for(let i = 0; i < length; i++) {
            emptySlot[i] = [ undefined, '' ];
        }

        return {
            ...state,
            emptySlot
        }
    }

    if(action.type === 'RETURN_TO_PREV_STATE') {
        const defaultSlot = state.default;
        const [index, data] = state.emptySlot[action.id];
        defaultSlot[index] = data;

        return {
            ...state,
            default: defaultSlot,
            guessed: true,
        }
    }

    if(action.type === 'FILLED_EMPTY_SLOT') {
        const data = action.data;
        const slots = state.emptySlot;
        let filled = true;
        let word = '';
        let start = state.start;
        let difficulty = state.difficulty;
        let level = state.level;
        let coins = state.coins;
        let answer = state.answer;
        let previousAnswer = '';
        let emptySlot = state.emptySlot;
        let defaultState = state.default;
        let firstEmptySlotNo = state.firstEmptySlotNo;

        let guessed = true;
        let won = false;

        let fastGuessData = state.fastGuessData;
        let guessedValues = state.guessedValues;
        let setDisableHole = state.setDisableHole;
        let unPressable = state.unPressable;

        let congratulation = state.congratulation;

        for(let i = 0; i < slots.length; i++) {
            const [index, letter] = slots[i];
            if(letter === '') {
                filled = false;
                break;
            }

            word = word + letter;
        }

        // if filled is true then all empty slots are filled with letters
        if(filled) {
            if(word === state.answer) {
                const maxNoOfDifficulty = Object.keys(data[difficulty]).length;

                start = true;
                level++;
                coins += 4;
                previousAnswer = state.answer;

                // change this part
                if(level > 10) {
                    congratulation = true;
                }
                
                if(level > maxNoOfDifficulty) {
                    const diff = Object.keys(data);

                    let indexOfDiff = diff.indexOf(difficulty);
                    indexOfDiff = ++indexOfDiff;

                    if(indexOfDiff < diff.length) {
                        difficulty = diff[indexOfDiff];
                        level = 1;
                    }
                }

                answer = data[difficulty][`pzz_${level}`].answer;
                answer = answer.toUpperCase();
                emptySlot = [];
                defaultState = [];
                firstEmptySlotNo = 0;
                won = true;

                fastGuessData = [];
                guessedValues = [];
                setDisableHole = [];
                unPressable = [];
            } else {
                guessed = false;
            }
        }

        return {
            ...state,
            start,
            difficulty,
            level,
            coins,
            answer,
            previousAnswer,
            emptySlot,
            default: defaultState,
            firstEmptySlotNo,
            guessed,
            won,
            fastGuessData,
            guessedValues,
            setDisableHole,
            unPressable,
            congratulation,
        }
    }

    if(action.type === 'NEXT') {
        return {
            ...state,
            won: !state.won,
        }
    }

    if(action.type === 'GUESS') {
        if(state.guessedValues.length >= state.answer.length) {
            return { ...state }
        }

        return {
            ...state,
            guessedValues: [
                ...state.guessedValues,
                action.value,
            ],
        }
    }

    if(action.type === 'INIT_DISABLE_SLOT') {
        const setDisableHole = [];
        state.default.forEach((_, i) => {
            setDisableHole[i] = false;
        });

        return {
            ...state,
            setDisableHole,
        }
    }

    if(action.type === 'INIT_UNPRESSABLE') {
        const unPressable = [];
        for(let i = 0; i < state.answer.length; i++) {
            unPressable[i] = false;
        }

        return {
            ...state,
            unPressable,
        }
    }

    if(action.type === 'DISABLE_HOLE') {
        const guessAnswer = action.paidLetter;
        const newDisableHole = [];
        const emptySlot = state.emptySlot;
        let fastGuessData = state.fastGuessData;

        const index = state.default.indexOf(guessAnswer);

        // no result found
        if(index == -1) {
            for(let i = 0; i < emptySlot.length; i++) {
                const [id, char] = emptySlot[i];

                if(guessAnswer === char) {
                    const answer = state.answer[i];

                    if(char !== answer) {
                        emptySlot[i] = [undefined, ''];
                        emptySlot[action.no] = [id, char];

                        fastGuessData = [
                            ...state.fastGuessData,
                            { id, letter: '', prevLetter: char, index: state.fastGuessData.length }
                        ];

                        break;
                    }
                }
            };
        }

        if(index >= 0) {
            newDisableHole[index] = true;
        }

        return {
            ...state,
            setDisableHole: newDisableHole,
            emptySlot,
            fastGuessData,
        }
    }

    if(action.type === 'UPDATE_GUESSED_SLOT') {        
        const slotsLetter = state.emptySlot;
        const index = state.guessedValues[action.index];
        slotsLetter[index] = [ action.id, action.value ];

        return {
            ...state,
            emptySlot: [...slotsLetter]
        }
    }

    if(action.type === 'SAVE_LETTER_DATA') {
        return {
            ...state,
            fastGuessData: [
                ...state.fastGuessData,
                action.guessData,
            ],
            setGuessUpdate: !state.setGuessUpdate,
        }
    }

    if(action.type === 'UNPRESSABLE') {
        const unPressable = state.unPressable;

        unPressable.forEach((press, i) => {
            if(i === action.no) {
                unPressable[i] = true;
            }
        });

        return {
            ...state,
        }
    }

    if(action.type === 'CUT') {
        let coins = state.coins;
        coins = coins - 2;

        return {
            ...state,
            coins,
        }
    }

    throw new Error('Lerry No matching action type');
}