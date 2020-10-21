const handleSubmit = async (event) => {
    setError(false);
    setDisabled(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.stopPropagation();
    } else {
        setValidated(true);
        try {
            prepareData();
            await sendMovie(method, data, location?.id);
            setResCorrect(true);
        } catch(e) {
            console.log(e);
            setError(true);
        }
    }
    setDisabled(false);
};