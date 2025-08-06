type ButtonsProps = { numCheckedWords: number; onSubmit: () => void };


export default function Buttons( {numCheckedWords, onSubmit }: ButtonsProps) {

    return (
        <div className="buttons">
            <button className="submit-button" disabled={numCheckedWords !== 2}  onClick={onSubmit}>Submit</button>
        </div>
    )
}