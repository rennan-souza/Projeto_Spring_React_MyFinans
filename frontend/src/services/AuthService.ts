import axios from "axios";
import type { LoginRequestType } from "../types/LoginRequestType";
import { jwtDecode } from "jwt-decode";
import type { AccessTokenPayloadType } from "../types/AccessTokenPayloadType";
import type { CriarContaRequestType } from "../types/CriarContaRequestType";

const baseURL: string = "http://localhost:8080/api";

export async function autenticar(obj: LoginRequestType) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.post(`${baseURL}/auth/login`, obj, config);
    return response;
}

export async function criarConta(obj: CriarContaRequestType) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.post(`${baseURL}/auth/cadastrar`, obj, config);
    return response;
}

export function getAccessTokenPayload(): AccessTokenPayloadType | undefined {
    try {
        const token = localStorage.getItem("token");

        if (token === null) {
            return undefined;
        } else {
            return (jwtDecode(token) as AccessTokenPayloadType);
        }
    } catch (error) {
        return undefined;
    }
}

export function isAuthenticated(): boolean {
    let tokenPayload = getAccessTokenPayload();
    if (tokenPayload && tokenPayload.exp * 1000 > Date.now()) {
        return true;
    }
    return false;
}

export function getUserPerfis() {
    const token = getAccessTokenPayload();
    if (token) {
        return token.perfis;
    }
    return [];
}

export function hasAnyPerfis(perfis: string[]): boolean {
    if (perfis.length === 0) {
        return true;
    }

    const tokenPayload = getAccessTokenPayload();

    if (tokenPayload !== undefined) {
        for (var i = 0; i < perfis.length; i++) {
            if (tokenPayload.perfis.includes(perfis[i])) {
                return true;
            }
        }
    }
    return false;
}