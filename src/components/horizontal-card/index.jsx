import "./styles.css"

export default function HorizontalCard({number, desciption, image}) {
    return (
        <div className="horizontal-card-container d-flex flex-column">
            <div className="d-flex flex-row justify-content-between align-items-center horizontal-card-content">
                <div className="d-flex flex-column align-items-center">
                    <h2 className="fs-1">{number}</h2>
                    <p className="fs-4 text-center">{desciption}</p>
                </div>
                <img src={image} alt="" />
            </div>
            <div className="fs-5 text-center horizontal-card-footer" >Thêm thông tin</div>
        </div>
    )
}