
// ╔═══╗──╔╗───────────╔══╗
// ║╔═╗║─╔╝╚╗──────────║╔╗║
// ║║─║╠═╩╗╔╬╦══╦═╗╔══╗║╚╝╚╦╦══╗
// ║╚═╝║╔═╣║╠╣╔╗║╔╗╣══╣║╔═╗╠╣╔╗║
// ║╔═╗║╚═╣╚╣║╚╝║║║╠══║║╚═╝║║╚╝║
// ╚╝─╚╩══╩═╩╩══╩╝╚╩══╝╚═══╩╩══╝
import { types } from "../../../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "../../uiNotificactions/ui";
import { constaApi } from "constants/constants";
import { loadBios } from "helpers/contactsHelpers/loadBios";
import { loadBiosProspect } from "helpers/contactsHelpers/loadBios";

export const newBioC = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'bio/save',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingBioC(data.id_contact) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}

export const updatedBioC = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'bio/update',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingBioC(data.id_contact) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error'));
            dispatch( finishLoading() );
            });
    }
}

export const deleteBioC = (id,idContact) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post(constaApi+'bio/delete',{id:id})
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingBioC(idContact) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error'));
            dispatch( finishLoading() );
            });
    }
}
export const starLoadingBioC = (id) => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const biosC = await loadBios(id);
        await dispatch( setBiosC(biosC) );
        dispatch( finishLoading() );
    }
}

export const starLoadingProspect = (id,id_type_prospection) => {
    console.log('me ejecute');
    return async (dispatch) => {
        dispatch( startLoading() );
        await dispatch( setBiosC([]) );
        const biosC = await loadBiosProspect(id,id_type_prospection);
         dispatch( setBiosC(biosC) );
        dispatch( finishLoading() );
    }
}
export const activeBioC = (id,bioC) => ({
    type: types.biosCActive,
    payload:{
        id,
        ...bioC
    }
})

export const setBiosC = ( biosC ) => ({
    type: types.biosCLoad,
    payload:[...biosC]
})