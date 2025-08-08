type ButtonsProps = { numSelectedWords: number; onSubmit: () => void };


export default function Buttons({ numSelectedWords, onSubmit }: ButtonsProps) {

    return (
        <div className="buttons">
            <button className="submit-button" disabled={numSelectedWords !== 2} onClick={onSubmit}>Submit</button>
        </div>
    )
}