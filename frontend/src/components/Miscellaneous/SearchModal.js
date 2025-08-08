import React from "react";

const SearchModal = () => {
	const title = "Search";
	const subtitle = "What are you looking for?";
	const description = "Enter your query now and find precisely what you seek.";
	const placeholder = "Enter your keywords";
	const buttonText = "Search";

	return (
		<div id="search" className="modal fade p-0">
			<div className="modal-dialog dialog-animated">
				<div className="modal-content h-100">
					<div className="modal-header" data-bs-dismiss="modal">
						{title} <i className="far fa-times-circle icon-close"></i>
					</div>
					<div className="modal-body">
						<form className="row search-form">
							<div className="col-12 align-self-center">
								<div className="row">
									<div className="col-12 pb-3">
										<h2 className="search-title mt-0 mb-3">{subtitle}</h2>
										<p>{description}</p>
									</div>
								</div>
								<div className="row">
									<div className="col-12 input-group mt-md-4">
										<input type="text" placeholder={placeholder} className="form-control" />
									</div>
								</div>
								<div className="row">
									<div className="col-12 input-group align-self-center">
										<button type="submit" className="btn content-btn mt-4">
										{buttonText}
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
