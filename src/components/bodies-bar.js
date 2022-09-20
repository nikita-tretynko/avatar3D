import BodyCard from "./body-card";
const BodiesBar = ({bodies, selectedBodyId, onSelectAvatarsBody}) => {
    return (
        <div className="bodies-bar">
            <h2 className="text-center">Please, select body</h2>
            <div className="bodies-container">
                {bodies.map(body =>
                    <BodyCard name={body.name}
                              image={body.thumbnail_url}
                              id={body.id}
                              key={body.id}
                              selectedBodyId={selectedBodyId}
                              onSelectAvatarsBody={onSelectAvatarsBody}/>
                )}
            </div>
        </div>
    )
}

export default BodiesBar;