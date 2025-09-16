import './index.scss'
import { syllabary, initials, finals, specials } from './syllabary.js'
import { createSignal, createEffect } from 'solid-js'



export default function Yinxixue() {
    const [alphabet, setAlphabet] = createSignal('pin');
    const [initial, setInitial] = createSignal(undefined);
    const [final, setFinal] = createSignal(undefined);
    // const [search, setSearch] = createSignal("");
    const checkInitial = (i) => {
        return final() === undefined || syllabary.find(syl => {
            return (syl.initial == i && syl.final == final());
        }) !== undefined;
    };
    const checkFinal = (f) => {
        return initial() === undefined || syllabary.find(syl => {
            return (syl.final == f && syl.initial == initial());
        }) !== undefined;
    };
    const syllable = () => {
        return syllabary.find(syl => syl.initial == initial() && syl.final == final());
    };
    const [toneIndex, setToneIndex] = createSignal([0, 0, 0, 0, 0]);
    createEffect(() => { if (syllable() !== undefined) setToneIndex([0, 0, 0, 0, 0]); });

    const Search = <input 
        class="search"
        type="text"
        placeholder="pinyin search..."
        onKeyUp={ () => {
            const syl = syllabary.find(s => s.pinyin == Search.value);
            if (syl) {
                setInitial(syl.initial);
                setFinal(syl.final);
            } else {
                setInitial(undefined);
                setFinal(undefined);
            }
        } }
    />;

    function CellInitial(props) {
        return (
            <button
                class="cell"
                classList={{ 
                    selected: initial() == props.id, 
                    shadow: !checkInitial(props.id) 
                }}
                onClick={() => {
                    Search.value = "";
                    if (initial() == props.id) {
                        setInitial(undefined);
                    } else {
                        setInitial(props.id);
                        if (!checkInitial(props.id)) {
                            setFinal(undefined);
                        }
                    }
                }}
            >{props.label}</button>
        );
    }
    function CellFinal(props) {
        return (
            <button
                class="cell"
                classList={ { 
                    selected: final() == props.id, 
                    shadow: !checkFinal(props.id) 
                } }
                onClick={ () => {
                    Search.value = "";
                    if (final() == props.id) {
                        setFinal(undefined);
                    } else {
                        setFinal(props.id);
                        if (!checkFinal(props.id)) {
                            setInitial(undefined);
                        }
                    }
                } }
            >{props.label}</button>
        );
    }

    return (<>

<header>
    <div class="radio">
        <button 
            classList={ {selected: alphabet() == 'pin'} }
            onClick={() => setAlphabet('pin')}
        >拼音</button>
        <button 
            classList={ {selected: alphabet() == 'ipa'} }
            onClick={() => setAlphabet('ipa')}
        >音標</button>
        <button 
            classList={ {selected: alphabet() == 'zhu'} }
            onClick={() => setAlphabet('zhu')}
        >住音</button>
    </div>
    {Search}
</header>

<div id="page">
    <div id="left">
        <div>
            <h2>声母</h2>
            <div class="table" id="initials">
            <CellInitial id={-1} label="Ø"/>
            <div class="top">
                <div class="header">唇</div>
                <div class="header">龈</div>
                <div class="header">卷舌</div>
                <div class="header">龈腭</div>
                <div class="header">软腭</div>
            </div>
            <div class="rows">
                <div class="row">
                <div class="header">鼻</div>
                <CellInitial id={0} label={initials[0][alphabet()]}/>
                <CellInitial id={1} label={initials[1][alphabet()]}/>
                <div></div>
                <div></div>
                <div></div>
                </div>
                <div class="suprow">
                    <div class="header">塞</div>
                    <div class="row">
                    <div class="header">气</div>
                    <CellInitial id={2} label={initials[2][alphabet()]}/>
                    <CellInitial id={3} label={initials[3][alphabet()]}/>
                    <div></div>
                    <div></div>
                    <CellInitial id={4} label={initials[4][alphabet()]}/>
                    </div>
                    <div class="row">
                    <div class="header">不</div>
                    <CellInitial id={5} label={initials[5][alphabet()]}/>
                    <CellInitial id={6} label={initials[6][alphabet()]}/>
                    <div></div>
                    <div></div>
                    <CellInitial id={7} label={initials[7][alphabet()]}/>
                    </div>
                </div>
                <div class="suprow">
                    <div class="header">塞擦</div>
                    <div class="row">
                    <div class="header">气</div>
                    <div></div>
                    <CellInitial id={8} label={initials[8][alphabet()]}/>
                    <CellInitial id={9} label={initials[9][alphabet()]}/>
                    <CellInitial id={10} label={initials[10][alphabet()]}/>
                    <div></div>
                    </div>
                    <div class="row">
                    <div class="header">不</div>
                    <div></div>
                    <CellInitial id={11} label={initials[11][alphabet()]}/>
                    <CellInitial id={12} label={initials[12][alphabet()]}/>
                    <CellInitial id={13} label={initials[13][alphabet()]}/>
                    <div></div>
                    </div>
                </div>
                <div class="row">
                <div class="header">擦</div>
                <CellInitial id={14} label={initials[14][alphabet()]}/>
                <CellInitial id={15} label={initials[15][alphabet()]}/>
                <CellInitial id={16} label={initials[16][alphabet()]}/>
                <CellInitial id={17} label={initials[17][alphabet()]}/>
                <CellInitial id={18} label={initials[18][alphabet()]}/>
                </div>
                <div class="row">
                <div class="header">边</div>
                <div></div>
                <CellInitial id={19} label={initials[19][alphabet()]}/>
                <CellInitial id={20} label={initials[20][alphabet()]}/>
                <div></div>
                <div></div>
                </div>
            </div>
            </div>
        </div>

        <div>
            <h2>汉子</h2>
            <div class="table" id="tones">
                <div class="head">
                    <div class="header">阴</div>
                    <div class="header">阳</div>
                    <div class="header">上</div>
                    <div class="header">去</div>
                    <div class="header">轻</div>
                </div>
                <div class="cells">
                    <For each={[0,1,2,3,4]}>{(t) => (
                        <Show when={syllable()?.characters[t].length} fallback={<div></div>}>
                            <button 
                                class="cell"
                                onClick={ () => {
                                    setToneIndex([...toneIndex()].map((v, i) => {
                                        if (i == t) return (v+1) % syllable().characters[t].length;
                                        else return v;
                                    })); 
                                } }
                            >
                                { syllable().characters[t][toneIndex()[t]] }
                                <span>{ syllable().pinyin.replace(
                                        /(ch|zh|sh|[mpbfntdczslrqjxkghwy])?(i|u)?([aeiou])(.*)/,
                                        (_, i, m, n, c) => (i||"") + (m||"") + n + ['\u0304', '\u0301', '\u030C', '\u0300', ''][t] + c
                                    )
                                }</span>
                            </button>
                        </Show>
                    )}
                    </For>
                </div>
            </div>
          </div>
    </div>

    <div>
        <h2>他</h2>
        <div class="table" id="specials">
            <div class="header">他</div>
            <CellFinal id={-1} label={specials[0][alphabet()]}/>
            <CellFinal id={-2} label={specials[1][alphabet()]}/>
            <CellFinal id={-3} label={specials[2][alphabet()]}/>
        </div>
    </div>

    <div>
        <h2>韻母</h2>
        <div class="table" id="finals">
        <div class="head">
            <div class="header">腹</div>
            <div class="header">头</div>
            <div class="header">尾</div>
        </div>
        <div class="top">
            <div class="header">Ø</div>
            <div class="header">[w]</div>
            <div class="header">[j]</div>
            <div class="header">[ɥ]</div>
        </div>
        <div class="left">
            <div class="header">闭</div>
            <div class="header">中</div>
            <div class="header">开</div>
        </div>
        <div class="rows">
            <div class="row l1 r1">
            <CellFinal id={0} label={finals[0][alphabet()]}/>
            <CellFinal id={1} label={finals[1][alphabet()]}/>
            <CellFinal id={2} label={finals[2][alphabet()]}/>
            <CellFinal id={3} label={finals[3][alphabet()]}/>
            </div>
            <div class="row l2 r1">
            <CellFinal id={4} label={finals[4][alphabet()]}/>
            <CellFinal id={5} label={finals[5][alphabet()]}/>
            <CellFinal id={6} label={finals[6][alphabet()]}/>
            <CellFinal id={7} label={finals[7][alphabet()]}/>
            </div>
            <div class="row l2 r2">
            <CellFinal id={8} label={finals[8][alphabet()]}/>
            <div></div>
            <CellFinal id={9} label={finals[9][alphabet()]}/>
            <div></div>
            </div>
            <div class="row l2 r3">
            <CellFinal id={10} label={finals[10][alphabet()]}/>
            <CellFinal id={11} label={finals[11][alphabet()]}/>
            <div></div>
            <div></div>
            </div>
            <div class="row l2 r4">
            <CellFinal id={12} label={finals[12][alphabet()]}/>
            <CellFinal id={13} label={finals[13][alphabet()]}/>
            <CellFinal id={14} label={finals[14][alphabet()]}/>
            <CellFinal id={15} label={finals[15][alphabet()]}/>
            </div>
            <div class="row l2 r5">
            <CellFinal id={16} label={finals[16][alphabet()]}/>
            <CellFinal id={17} label={finals[17][alphabet()]}/>
            <CellFinal id={18} label={finals[18][alphabet()]}/>
            <CellFinal id={19} label={finals[19][alphabet()]}/>
            </div>
            <div class="row l3 r1">
            <CellFinal id={20} label={finals[20][alphabet()]}/>
            <CellFinal id={21} label={finals[21][alphabet()]}/>
            <CellFinal id={22} label={finals[22][alphabet()]}/>
            <div></div>
            </div>
            <div class="row l3 r2">
            <CellFinal id={23} label={finals[23][alphabet()]}/>
            <div></div>
            <CellFinal id={24} label={finals[24][alphabet()]}/>
            <div></div>
            </div>
            <div class="row l3 r3">
            <CellFinal id={25} label={finals[25][alphabet()]}/>
            <CellFinal id={26} label={finals[26][alphabet()]}/>
            <div></div>
            <div></div>
            </div>
            <div class="row l3 r4">
            <CellFinal id={27} label={finals[27][alphabet()]}/>
            <CellFinal id={28} label={finals[28][alphabet()]}/>
            <CellFinal id={29} label={finals[29][alphabet()]}/>
            <CellFinal id={30} label={finals[30][alphabet()]}/>
            </div>
            <div class="row l3 r5">
            <CellFinal id={31} label={finals[31][alphabet()]}/>
            <CellFinal id={32} label={finals[32][alphabet()]}/>
            <CellFinal id={33} label={finals[33][alphabet()]}/>
            <div></div>
            </div>
        </div>
        <div class="right">
            <div class="header">Ø</div>
            <div class="header">[u]</div>
            <div class="header">[i]</div>
            <div class="header">[n]</div>
            <div class="header">[ŋ]</div>
            <div class="header">Ø</div>
            <div class="header">[u]</div>
            <div class="header">[i]</div>
            <div class="header">[n]</div>
            <div class="header">[ŋ]</div>
        </div>
        </div>
    </div>
</div>

    </>);
}