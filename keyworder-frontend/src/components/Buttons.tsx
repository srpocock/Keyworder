type ButtonsProps = { disabled: boolean; onSubmit: () => void };


export default function Buttons({ disabled, onSubmit }: ButtonsProps) {

    return (
        <div className="buttons">
            <button className="submit-button" disabled={disabled} onClick={onSubmit}>Submit</button>
        </div>
    )
}